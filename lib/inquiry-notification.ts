import {sendMail,type MailMessage} from './mailer';
import type {inquiryRecord} from './project-inquiry';
import {readSubmission,recentSubmissionKeys,updateNotification,type SubmissionRecord} from './submissions';

export type InquiryData = ReturnType<typeof inquiryRecord>;
const FORM = 'project-inquiry';
const MAX_ATTEMPTS = 5,RETRY_WINDOW_MS = 7*24*60*60*1000;

const escape = (value:string) => value.replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]!);
export const reference = (id:string) => id.slice(0,8).toUpperCase();

/** Internal notification for the team. Every visitor-supplied value is HTML-escaped. */
export function inquiryEmail(record:SubmissionRecord<InquiryData>,stored=true):MailMessage {
  const {project,contact} = record.data;
  const received = new Intl.DateTimeFormat('en-GB',{dateStyle:'full',timeStyle:'short',timeZone:'Asia/Riyadh'}).format(new Date(record.submittedAt));
  const row = (label:string,value:string) => `<tr><th align="left" valign="top" width="120" style="width:120px;padding:6px 16px 6px 0;color:#6b6560;font-weight:500;white-space:nowrap">${label}</th><td style="padding:6px 0;color:#1b1a19">${value}</td></tr>`;
  const section = (title:string,rows:string) => `<h2 style="font-size:15px;margin:28px 0 8px;color:#1b1a19">${title}</h2><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;line-height:1.6">${rows}</table>`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f4f1;font-family:Segoe UI,Helvetica,Arial,sans-serif">
<div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e4dfd9;border-radius:8px;padding:28px">
<p style="margin:0 0 4px;font-size:12px;color:#fd4601;letter-spacing:.08em;text-transform:uppercase">New project enquiry</p>
<h1 style="margin:0;font-size:22px;color:#1b1a19" dir="auto">${escape(contact.name)}${contact.company?` · ${escape(contact.company)}`:''}</h1>
${section('Project',
  row('Goal',escape(project.intent.label))+
  row('Timeline',escape(project.timeline.label))+
  // Direction per line, so an Arabic first line does not flip the English lines after it.
  row('Note',project.description?project.description.split(/\r?\n/).map(line => `<div dir="auto" style="white-space:pre-wrap;min-height:1em">${escape(line)}</div>`).join(''):'<span style="color:#8a847e">No note added</span>'))}
${section('Contact',
  row('Name',`<span dir="auto">${escape(contact.name)}</span>`)+
  row('Email',`<a href="mailto:${escape(contact.email)}" style="color:#c73a00">${escape(contact.email)}</a>`)+
  (contact.company?row('Company',`<span dir="auto">${escape(contact.company)}</span>`):'')+
  (contact.phone?row('Phone',`<a href="tel:${escape(contact.phone.replace(/[^\d+]/g,''))}" style="color:#c73a00">${escape(contact.phone)}</a>`):''))}
${section('Submission',
  row('Reference',`<code>${reference(record.id)}</code>`)+
  row('Received',`${escape(received)} (Riyadh)`)+
  row('Site language',record.locale==='ar'?'Arabic':'English'))}
<p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#8a847e">Reply to this email to answer ${escape(contact.name)} directly.${stored?` The full record is stored on the website server as <code>${escape(record.id)}.json</code>.`:' This email is the only copy of the enquiry: the website does not store it.'}</p>
</div></body></html>`;
  return {
    subject:`New project enquiry: ${contact.name} (${project.intent.label}) [${reference(record.id)}]`,
    html,
    replyTo:{address:contact.email,name:contact.name},
  };
}

// One notification per file at a time, so a retry sweep and a fresh submission
// can never both send the same enquiry.
const inFlight = new Set<string>();

async function notify(file:string) {
  if (inFlight.has(file)) return;
  inFlight.add(file);
  try {
    const record = await readSubmission<InquiryData>(file);
    const state = record.notification||{status:'pending',attempts:0};
    if (state.status==='sent'||state.status==='skipped') return;
    const attemptAt = new Date().toISOString(),attempts = state.attempts+1;
    try {
      const result = await sendMail(inquiryEmail(record));
      await updateNotification(file,result.status==='sent'
        ?{status:'sent',attempts,lastAttemptAt:attemptAt,sentAt:new Date().toISOString()}
        :{status:'skipped',attempts,lastAttemptAt:attemptAt,error:result.reason});
      if (result.status==='sent') console.info(`[inquiry] notification sent for ${reference(record.id)}`);
    } catch (error) {
      const message = error instanceof Error?error.message:String(error);
      console.error(`[inquiry] notification failed for ${reference(record.id)} (attempt ${attempts}/${MAX_ATTEMPTS}): ${message}`);
      await updateNotification(file,{status:'failed',attempts,lastAttemptAt:attemptAt,error:message.slice(0,500)});
    }
  } finally {
    inFlight.delete(file);
  }
}

/** Retry recent failures (up to 5 attempts within 7 days). Runs after each new submission. */
async function retryFailed(except:string) {
  for (const file of await recentSubmissionKeys(FORM)) {
    if (file===except) continue;
    try {
      const record = await readSubmission<InquiryData>(file);
      const state = record.notification;
      if (state?.status==='failed'&&state.attempts<MAX_ATTEMPTS&&Date.now()-Date.parse(record.submittedAt)<RETRY_WINDOW_MS) await notify(file);
    } catch (error) {
      console.error(`[inquiry] could not read ${file} for retry`,error);
    }
  }
}

/** Email the team about a stored enquiry, then retry any earlier failures. Never throws. */
export async function notifyInquiry(file:string) {
  try {
    await notify(file);
    await retryFailed(file);
  } catch (error) {
    console.error('[inquiry] notification step crashed',error);
  }
}

/**
 * Email-only mode (nothing stored): send now and report the outcome, so the
 * route can tell the visitor to use the email fallback if it fails. A dry run
 * counts as a failure here, because nothing else would keep the enquiry.
 */
export async function deliverInquiry(record:SubmissionRecord<InquiryData>):Promise<{ok:true}|{ok:false;reason:string}> {
  try {
    const result = await sendMail(inquiryEmail(record,false));
    if (result.status==='sent') {
      console.info(`[inquiry] notification sent for ${reference(record.id)} (not stored)`);
      return {ok:true};
    }
    console.error(`[inquiry] enquiry ${reference(record.id)} NOT delivered and not stored: ${result.reason}`);
    return {ok:false,reason:result.reason};
  } catch (error) {
    const message = error instanceof Error?error.message:String(error);
    console.error(`[inquiry] enquiry ${reference(record.id)} NOT delivered and not stored: ${message}`);
    return {ok:false,reason:message};
  }
}
