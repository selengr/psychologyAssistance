import { IFormElementConstructor } from '@/@types/bulider';
import { SelectFieldFormElement } from './fields/SelectField';
import { SpectralFormElement } from './fields/SpectralField';
import { TextFieldFormElement } from './fields/TextField';
import { TitleFieldFinishFormElement } from './fields/TitleFieldFinish';
import { TitleFieldStartFormElement } from './fields/TitleFieldStart';

export type ElementsType =
  | 'TEXT_FIELD'
  | 'SelectField'
  | 'TitleFieldStart'
  | 'TitleFieldFinish'
  | 'SpectralField';

export type SubmitFunction = (key: number, value: string) => void;

export type FormElement = {
  questionType: ElementsType;

  construct: ({
    questionId,
    questionGroupId,
    formId,
    title,
  }: IFormElementConstructor) => FormElementInstance;

  designerBtnElement: {
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  questionId: number | null;
  questionGroupId: number | null;
  formId: number;
  title: string;
  questionType: ElementsType;
  position: number | null;
  questionPropertyList?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TEXT_FIELD: TextFieldFormElement,
  SelectField: SelectFieldFormElement,
  TitleFieldStart: TitleFieldStartFormElement,
  TitleFieldFinish: TitleFieldFinishFormElement,
  SpectralField: SpectralFormElement,
};
