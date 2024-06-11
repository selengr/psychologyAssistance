export type IFormElementConstructor = {
  questionId: number | null;
  questionGroupId: number | null;
  formId: number;
  title: string;
  temp: boolean;
  position: number | null;
};

export type IQPLTextField = [
  {
    questionPropertyEnum: 'TEXT_FIELD_PATTERN';
    value: string;
  },
  {
    questionPropertyEnum: 'REQUIRED';
    value: string;
  },
  {
    questionPropertyEnum: 'DESCRIPTION';
    value: string;
  },
];

export type IQPLMultipleChoice = [
  {
    questionPropertyEnum: 'MULTIPLE_SELECT';
    value: string;
  },
  {
    questionPropertyEnum: 'REQUIRED';
    value: string;
  },
  {
    questionPropertyEnum: 'RANDOMIZE_OPTIONS';
    value: string;
  },
  {
    questionPropertyEnum: 'DESCRIPTION';
    value: string;
  },
];

export type IDefaultValues = {
  TEXT_FIELD_PATTERN: string;
  REQUIRED: boolean;
  DESCRIPTION: string;
  title: string;
};
