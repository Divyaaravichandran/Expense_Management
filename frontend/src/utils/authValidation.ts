const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOWERCASE_REGEX = /[a-z]/;
const UPPERCASE_REGEX = /[A-Z]/;
const NUMBER_REGEX = /[0-9]/;

export const validateEmail = (email: string): string | null => {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    return "Email is required.";
  }

  if (normalizedEmail.length > 255) {
    return "Email must be 255 characters or fewer.";
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return "Please enter a valid email address.";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (password.length > 128) {
    return "Password must be 128 characters or fewer.";
  }

  if (!LOWERCASE_REGEX.test(password)) {
    return "Password must include at least one lowercase letter.";
  }

  if (!UPPERCASE_REGEX.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  if (!NUMBER_REGEX.test(password)) {
    return "Password must include at least one number.";
  }

  return null;
};

export const validateLoginPassword = (password: string): string | null => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length > 128) {
    return "Password must be 128 characters or fewer.";
  }

  return null;
};
