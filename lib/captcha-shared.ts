/** Captcha rules shared by the browser component and the server verifier. */
export const CAPTCHA_ALPHABET = '0123456789abcdefABCDEF';
export const CAPTCHA_LENGTH = 6;
export const CAPTCHA_PATTERN = /^[0-9a-fA-F]{6}$/;

/** What a form posts alongside its own fields. */
export type CaptchaAnswer = {token:string;answer:string};

/** Client-side format check before a request is spent on a wrong-looking answer. */
export function captchaAnswerError(answer:string,locale:'en'|'ar') {
  if (!answer) return locale==='ar'?'اكتب رمز التحقق الظاهر في الصورة.':'Enter the security code shown in the image.';
  if (!CAPTCHA_PATTERN.test(answer)) return locale==='ar'?'الرمز 6 خانات: أرقام 0–9 وحروف a–f أو A–F.':'The code is 6 characters: digits 0–9 and letters a–f or A–F.';
  return null;
}

/** Message for a server rejection; the component always loads a new image afterwards. */
export function captchaRejectedMessage(reason:string|undefined,locale:'en'|'ar') {
  const ar = locale==='ar';
  if (reason==='expired') return ar?'انتهت صلاحية الرمز. اكتب الرمز الجديد.':'That code expired. Enter the new one.';
  return ar?'الرمز غير مطابق. انتبه للحروف الكبيرة والصغيرة، واكتب الرمز الجديد.':'That code didn’t match. Letters are case-sensitive. Enter the new code.';
}
