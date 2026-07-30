const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

export function exceedsMaxLength(value: string, maxLength: number): boolean {
  return value.length > maxLength;
}
