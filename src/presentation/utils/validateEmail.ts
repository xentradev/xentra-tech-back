const VALID_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "yandex.com",
  "protonmail.com",
  "zoho.com",
];

export const validateEmail = (email: string) => {
  return VALID_EMAIL_DOMAINS.includes(email.split("@")[1]);
};
