export const REGEXES = {
  LETTER: /^[a-zA-Z]$/,
  LETTERS: /^[a-zA-Z]*$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  UPPER_CASE: /[A-Z]/,
  LOWER_CASE: /[a-z]/,
  SPECIAL_CHARACTER: /[!@#$%^&*]/,
  NUMBER: /[0-9]/,
};
