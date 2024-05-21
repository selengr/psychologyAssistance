import {
  englishRegex,
  NumberRegex,
  persianArabicRegex,
  specialCharRegexes_a_Z,
} from 'rootApp/helpers/regexes';

type LanguageOption = 'persian' | 'english';
type TExtractCharacters = (
  inputString: string,
  preferredLanguages: LanguageOption[],
  option?: {
    isValidNumber?: boolean;
    isValidSpace?: boolean;
    isValidSpecialChar?: boolean;
  }
) => string;
export const extractCharacters: TExtractCharacters = (
  inputString,
  preferredLanguages,
  option
) => {
  let str = '';

  const isLanguageMatch = (char: string): string => {
    if (
      preferredLanguages.includes('persian') &&
      persianArabicRegex.test(char)
    ) {
      return char;
    }
    if (preferredLanguages.includes('english') && englishRegex.test(char)) {
      return char;
    }
    if (!!option?.isValidNumber && NumberRegex.test(char)) {
      return char;
    }
    if (
      !!option?.isValidSpecialChar &&
      specialCharRegexes_a_Z.test(char) &&
      !persianArabicRegex.test(char)
    ) {
      return char;
    }
    if (!!option?.isValidSpace && char === ' ') {
      return char;
    }
    return '';
  };

  inputString.split('').forEach((char) => {
    str += isLanguageMatch(char);
  });

  return str;
};
