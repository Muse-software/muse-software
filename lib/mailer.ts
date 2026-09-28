/**
 * Outbound mail through Microsoft Graph, sending as a Microsoft 365 mailbox
 * (muse.sa is hosted on Exchange Online, and its SPF record only allows it).
 *
 * Uses the OAuth client-credentials flow of an Entra app registration with the
 * application permission Mail.Send, restricted to the sending mailbox by an
 * Exchange Application Access Policy or RBAC for Applications.
 *
 * When MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET are not all set, mail runs
 * in dry-run mode: the message is logged and reported as `skipped`.
 */
export type MailMessage = {subject:string;html:string;replyTo?:{address:string;name?:string}};
export type MailResult = {status:'sent'}|{status:'skipped';reason:string};

const list = (value:string|undefined) => (value||'').split(',').map(v => v.trim()).filter(Boolean);

export function mailConfig() {
  return {
    tenant:process.env.MS_TENANT_ID?.trim(),
    clientId:process.env.MS_CLIENT_ID?.trim(),
    clientSecret:process.env.MS_CLIENT_SECRET?.trim(),
    from:process.env.MAIL_FROM?.trim(),
    to:list(process.env.MAIL_TO||process.env.CONTACT_EMAIL),
    cc:list(process.env.MAIL_CC),
    // Overridable for national clouds (and local testing); defaults are global Azure.
    loginHost:process.env.MS_LOGIN_HOST||'https://login.microsoftonline.com',
    graphHost:process.env.MS_GRAPH_HOST||'https://graph.microsoft.com',
  };
}

let cachedToken:{value:string;expiresAt:number}|null = null;

async function accessToken(config:ReturnType<typeof mailConfig>) {
  if (cachedToken&&cachedToken.expiresAt>Date.now()+60_000) return cachedToken.value;
  const response = await fetch(`${config.loginHost}/${encodeURIComponent(config.tenant!)}/oauth2/v2.0/token`,{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({grant_type:'client_credentials',client_id:config.clientId!,client_secret:config.clientSecret!,scope:`${config.graphHost}/.default`}),
    signal:AbortSignal.timeout(15_000),
  });
  const body = await response.json().catch(() => ({})) as {access_token?:string;expires_in?:number;error?:string;error_description?:string};
  if (!response.ok||!body.access_token) throw new Error(`token request failed (${response.status} ${body.error||''}): ${(body.error_description||'').split('\r\n')[0]}`);
  cachedToken = {value:body.access_token,expiresAt:Date.now()+(body.expires_in||3600)*1000};
  return cachedToken.value;
}

const recipient = (address:string,name?:string) => ({emailAddress:name?{address,name}:{address}});

/** Sends one message. Throws on any delivery failure so callers can record and retry it. */
export async function sendMail(message:MailMessage):Promise<MailResult> {
  const config = mailConfig();
  if (!config.from||!config.to.length) return {status:'skipped',reason:'MAIL_FROM or MAIL_TO is not set'};
  if (!config.tenant||!config.clientId||!config.clientSecret) {
    console.info(`[mail] dry run (Microsoft Graph credentials not set): "${message.subject}" from ${config.from} to ${config.to.join(', ')}${config.cc.length?` cc ${config.cc.join(', ')}`:''}`);
    return {status:'skipped',reason:'dry run: Microsoft Graph credentials not set'};
  }
  const token = await accessToken(config);
  const response = await fetch(`${config.graphHost}/v1.0/users/${encodeURIComponent(config.from)}/sendMail`,{
    method:'POST',
    headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
    body:JSON.stringify({
      message:{
        subject:message.subject.replace(/[\r\n]+/g,' ').slice(0,255),
        body:{contentType:'HTML',content:message.html},
        toRecipients:config.to.map(address => recipient(address)),
        ccRecipients:config.cc.map(address => recipient(address)),
        ...(message.replyTo?{replyTo:[recipient(message.replyTo.address,message.replyTo.name)]}:{}),
      },
      saveToSentItems:false,
    }),
    signal:AbortSignal.timeout(15_000),
  });
  if (response.status===401) cachedToken = null;
  if (response.status!==202) {
    const body = await response.json().catch(() => ({})) as {error?:{code?:string;message?:string}};
    throw new Error(`sendMail failed (${response.status} ${body.error?.code||''}): ${body.error?.message||''}`);
  }
  return {status:'sent'};
}
