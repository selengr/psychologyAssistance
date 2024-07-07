import { IFormElementConstructor, IFormOptionList, tempObj } from '@/@types/bulider';
import { SpectralFormElement } from './fields/SpectralField';
import { TextFieldFormElement } from './fields/TextField';
import { TitleFieldFinishFormElement } from './fields/TitleFieldFinish';
import { TitleFieldStartFormElement } from './fields/TitleFieldStart';
import { MultipleChoiceFormElement } from './fields/MultipleChoice';

export type ElementsType =
  | 'TEXT_FIELD'
  | 'MULTIPLE_CHOICE'
  | 'TitleFieldStart'
  | 'TitleFieldFinish'
  | 'SPECTRAL';

export type SubmitFunction = (key: number, value: string) => void;

export type FormElement = {
  questionType: ElementsType;

  construct: ({
    questionId,
    questionGroupId,
    formId,
    title,
    position,
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
  questionId: number;
  questionGroupId?: number | null;
  formId?: number;
  title?: string;
  questionType?: ElementsType;
  position?: number | null;
  questionPropertyList?: Record<string, any>;
  optionList?: IFormOptionList[] | [] | null | undefined;
  temp?: boolean | tempObj;
  draft?: draftObj;
};

type draftObj = {
  prevGroup: number;
  position: number;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TEXT_FIELD: TextFieldFormElement,
  MULTIPLE_CHOICE: MultipleChoiceFormElement,
  SPECTRAL: SpectralFormElement,
  TitleFieldStart: TitleFieldStartFormElement,
  TitleFieldFinish: TitleFieldFinishFormElement,
};
