import { boolean } from 'zod';

export type IFormElementConstructor = {
  id: number;
  questionGroupId: number;
  formId: number;
  title: string;
  temp: boolean;
};

export type IQPLTextField = [
  {
    questionPropertyEnum: 'pattern';
    value: string;
  },
  {
    questionPropertyEnum: 'required';
    value: boolean;
  },
  {
    questionPropertyEnum: 'placeHolder';
    value: string;
  },
  {
    questionPropertyEnum: 'helperText';
    value: string;
  },
];
