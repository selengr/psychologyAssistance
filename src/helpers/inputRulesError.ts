import { emailRegex } from 'rootApp/helpers/regexes';

type TKeyRules = 'required' | 'minLengthMobile' | 'maxLengthMobile' | 'email';

interface IErrors {
  required?: { value: true; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
}

type IInputRulesError = (rules: TKeyRules[]) => IErrors | undefined;

const errors = {
  required: {
    key: 'required',
    message: 'لطفا این فیلد را پر کنید',
    value: true,
  },
  minLengthMobile: {
    key: 'minLength',
    message: 'حداقل 10 کارکتر وارد کنید',
    value: 10,
  },
  maxLengthMobile: {
    key: 'maxLength',
    message: 'حداکثر 10 کارکتر وارد کنید',
    value: 10,
  },
  email: {
    key: 'pattern',
    message: 'مقدار وارد شده با فرمت ایمیل مطابقت ندارد',
    value: emailRegex,
  },
};

export const inputRulesError: IInputRulesError = (rules) => {
  if (rules.length === 0) return;

  return rules.reduce((acc, rule) => {
    // @ts-ignore
    acc[errors[rule].key] = {
      value: errors[rule].value,
      message: errors[rule].message,
    };
    return acc;
  }, {} as IErrors);
};
