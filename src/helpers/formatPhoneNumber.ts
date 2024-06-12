// import { ChangeEvent } from 'react';
// import { decimalNumberRegex } from 'rootApp/helpers/regexes';

// export type onChangeTextField = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// type formatTypes = 'mobile' | 'countDevice';

// interface arg_formatPhoneNumber {
//   event?: onChangeTextField;
//   value?: string;
//   format?: string;
// }

// type TFormatPhoneNumber = (data: arg_formatPhoneNumber) => string;

// // Define the desired format and length
// export const formatsNumberInputs: { [key in formatTypes]: string } = {
//   mobile: '### ### ####',
//   countDevice: '###',
// };

// export const formatPhoneNumber: TFormatPhoneNumber = ({
//   value,
//   event,
//   format = formatsNumberInputs.mobile,
// }) => {
//   const phoneNumber = (value ?? event?.target?.value ?? '').replace(/\D/g, '');

//   const maxLength = format.length;

//   let formattedNumber = '';
//   let valueIndex = 0;

//   // Format the phone number character by character
//   for (let formatIndex = 0; formatIndex < maxLength; formatIndex++) {
//     const formatChar = format.charAt(formatIndex);

//     if (formatChar === '#') {
//       // Replace '#' with the next digit from the phone number
//       formattedNumber += phoneNumber.charAt(valueIndex) || '';
//       valueIndex++;
//     } else {
//       // Use the fixed character from the format
//       formattedNumber += formatChar;
//     }
//   }

//   return formattedNumber.trim();
// };

// type TExtractNumberOrEmpty = (data: {
//   event?: onChangeTextField;
//   value?: string;
//   maxLimitNumber?: number;
//   maxLength?: number;
// }) => string;

// export const extractNumberOrEmpty: TExtractNumberOrEmpty = ({
//   value,
//   event,
//   maxLimitNumber,
//   maxLength,
// }) => {
//   value = (value ?? event?.target?.value ?? '').toString().replace(/\D/g, '');

//   if (!value) {
//     return '';
//   }

//   const matches = value.match(decimalNumberRegex);
//   if (!matches || isNaN(parseFloat(matches[0]))) {
//     return '';
//   }

//   let extractedNumber: string | number = matches[0];
//   if (maxLength && maxLength > 0)
//     extractedNumber = String(extractedNumber).slice(0, maxLength);

//   return maxLimitNumber && Number(extractedNumber) > maxLimitNumber
//     ? maxLimitNumber.toString()
//     : extractedNumber;
// };
