/** Builds a WhatsApp chat link that opens with the message already typed. */
export function whatsappLink(baseUrl: string, message: string): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
}

/** Builds an email link that opens with the subject already filled in. */
export function mailtoLink(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
