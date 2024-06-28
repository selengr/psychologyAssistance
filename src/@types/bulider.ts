export type IFormElementConstructor = {
  questionId: number;
  questionGroupId: number | null;
  formId: number;
  title: string;
  position: number | null;
  temp?: boolean | tempObj;
  optionList: IFormOptionList;
};

export type tempObj = {
  prevPosition: number;
  prevQuestionGroupId: number;
};

export type IFormOptionList = {
  score: number;
  title: string;
};

export type ITextFieldFormPatternOptions = {
  value: string;
  label: string;
}[];

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
    value: string | null;
  },
  {
    questionPropertyEnum: 'MINIMUM_LEN';
    value: string | number | null;
  },
  {
    questionPropertyEnum: 'MAXIMUM_LEN';
    value: string | number | null;
  },
];

export type ISpectralQTapAndOptionsType = { value: string; label: string }[];

export type IQPLSpectral = [
  {
    questionPropertyEnum: 'SPECTRAL_TYPE';
    value: string;
  },
  {
    questionPropertyEnum: 'REQUIRED';
    value: string;
  },
  {
    questionPropertyEnum: 'DESCRIPTION';
    value: string | null;
  },
  {
    questionPropertyEnum: 'SELECTION_TYPE';
    value: string;
  },
  {
    questionPropertyEnum: 'STEP';
    value: number | string;
  },
  {
    questionPropertyEnum: 'SPECTRAL_START';
    value: number | string;
  },
  {
    questionPropertyEnum: 'SPECTRAL_END';
    value: number | string;
  },
];

export type IQPLMultipleChoice = [
  {
    questionPropertyEnum: 'MULTI_SELECT';
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
    value: string | null;
  },
];

export type ITest = {
  name: string;
};
