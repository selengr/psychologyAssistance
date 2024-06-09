import { CheckboxFieldFormElement } from './fields/CheckboxField';
import { DateFieldFormElement } from './fields/DateField';
import { NumberFieldFormElement } from './fields/NumberField';
import { SelectFieldFormElement } from './fields/SelectField';
import { SpectralFormElement } from './fields/SpectralField';
import { TextAreaFormElement } from './fields/TextAreaField';
import { TextFieldFormElement } from './fields/TextField';
import { TitleFieldFinishFormElement } from './fields/TitleFieldFinish';
import { TitleFieldStartFormElement } from './fields/TitleFieldStart';

export type ElementsType =
  | 'TextField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField'
  | 'TitleFieldStart'
  | 'TitleFieldFinish'
  | 'SpectralField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

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
  id: string;
  type: ElementsType;
  questionPropertyList?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
  TitleFieldStart: TitleFieldStartFormElement,
  TitleFieldFinish: TitleFieldFinishFormElement,
  SpectralField: SpectralFormElement,
};
