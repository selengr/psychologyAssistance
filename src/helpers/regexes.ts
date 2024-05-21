export const decimalNumberRegex = /\d+\.{0,1}\d*/g;

export const NumberRegex = /^-?\d+(\.\d+)?$/;

export const persianArabicRegex = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF]/;

export const englishRegex = /[a-zA-Z]/;

export const emailRegex = /\S+@\S+\.\S+/;

export const specialCharRegexes_a_Z =
  /^[^\sA-Za-z0-9]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*[^\sA-Za-z0-9]*$/;
