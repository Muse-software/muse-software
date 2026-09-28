import {createHmac,randomUUID} from 'node:crypto';
import {mkdir,readdir,readFile,rename,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {clientIp} from './rate-limit';

/**
 * File-based store for form submissions: one pretty-printed JSON document per
 * submission, grouped by form and month, e.g.
 *
 *   data/submissions/project-inquiry/2026/09/2026-09-28T13-04-11Z_<id>.json
 *
 * Files contain visitor PII: the directory is git-ignored and written 0600.
 * On Vercel nothing is stored (see storage modes below).
 */
// turbopackIgnore: these paths exist only at runtime; without it the build traces the whole project into the function.
export const SUBMISSIONS_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.SUBMISSIONS_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(),'data','submissions'));
export const SUBMISSION_SCHEMA_VERSION = 1;

export type SubmissionMeta = {userAgent:string|null;referrer:string|null;ipHash:string|null};
/**
 * Email notification state. `skipped` means mail was not configured (dry run)
 * and is never retried, so enabling mail later cannot replay test data.
 */
export type NotificationState = {
  status:'pending'|'sent'|'failed'|'skipped';
  attempts:number;
  lastAttemptAt?:string;
  sentAt?:string;
  error?:string;
};
export type SubmissionRecord<T> = {
  schemaVersion:number;
  id:string;
  form:string;
  submittedAt:string;
  locale:string;
  data:T;
  meta:SubmissionMeta & {captcha:'verified'};
  notification:NotificationState;
};

/** Request details worth keeping for abuse review, with the IP hashed rather than stored. */
export function requestMeta(request:Request):SubmissionMeta {
  const ip = clientIp(request);
  const key = process.env.CAPTCHA_SECRET||'';
  return {
    userAgent:request.headers.get('user-agent')?.slice(0,400)||null,
    referrer:request.headers.get('referer')?.slice(0,400)||null,
    ipHash:ip!=='unknown'&&key?createHmac('sha256',key).update(ip).digest('hex').slice(0,24):null,
  };
}

/*
 * Storage modes, chosen by SUBMISSIONS_STORAGE or automatically:
 *  - `disk`: one JSON file per submission under SUBMISSIONS_DIR, keyed like
 *    `project-inquiry/2026/09/2026-09-28T13-04-11Z_<id>.json` (default locally
 *    and on self-hosted servers);
 *  - `none`: nothing is stored and the team email is the only copy (default
 *    on Vercel, whose filesystem is read-only). The route then sends the email
 *    before replying, so a failed send reaches the visitor instead of losing
 *    the enquiry.
 */
export type StorageMode = 'disk'|'none';
export function storageMode():StorageMode {
  const configured = process.env.SUBMISSIONS_STORAGE?.trim();
  if (configured==='disk'||configured==='none') return configured;
  return process.env.VERCEL?'none':'disk';
}

const onDisk = (key:string) => path.join(/*turbopackIgnore: true*/ SUBMISSIONS_DIR,...key.split('/'));
// Write-then-rename so a crash never leaves a half-written JSON file behind.
async function writeAtomic(file:string,record:unknown) {
  const temp = `${file}.${randomUUID()}.tmp`;
  await writeFile(temp,`${JSON.stringify(record,null,2)}\n`,{mode:0o600,flag:'wx'});
  await rename(temp,file);
}
const monthPrefix = (form:string,date:Date) => {
  if (!/^[a-z0-9-]+$/.test(form)) throw new Error(`Invalid form name: ${form}`);
  return `${form}/${date.getUTCFullYear()}/${String(date.getUTCMonth()+1).padStart(2,'0')}/`;
};

export function createRecord<T>(form:string,locale:string,data:T,meta:SubmissionMeta):SubmissionRecord<T> {
  return {schemaVersion:SUBMISSION_SCHEMA_VERSION,id:randomUUID(),form,submittedAt:new Date().toISOString(),locale,data,meta:{...meta,captcha:'verified'},notification:{status:'pending',attempts:0}};
}

/** Writes a new record to disk and returns its key. */
export async function saveSubmission<T>(record:SubmissionRecord<T>) {
  const at = new Date(record.submittedAt);
  const key = `${monthPrefix(record.form,at)}${record.submittedAt.replace(/:/g,'-').replace(/\.\d+Z$/,'Z')}_${record.id}.json`;
  await mkdir(path.dirname(onDisk(key)),{recursive:true,mode:0o700});
  await writeAtomic(onDisk(key),record);
  return key;
}

export async function readSubmission<T>(key:string) {
  return JSON.parse(await readFile(onDisk(key),'utf8')) as SubmissionRecord<T>;
}

export async function updateNotification(key:string,notification:NotificationState) {
  const record = await readSubmission(key);
  await writeAtomic(onDisk(key),{...record,notification});
}

/** Submission keys from this month and last month (enough for a 7-day retry window). */
export async function recentSubmissionKeys(form:string) {
  const now = new Date(),previous = new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-1,1));
  const keys:string[] = [];
  for (const prefix of [monthPrefix(form,previous),monthPrefix(form,now)]) {
    try { keys.push(...(await readdir(onDisk(prefix))).filter(name => name.endsWith('.json')).map(name => prefix+name)); }
    catch (error) { if ((error as NodeJS.ErrnoException).code!=='ENOENT') throw error; }
  }
  return keys;
}
