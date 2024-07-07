'use client';

import { useEffect, useState } from 'react';
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from '../FormElements';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDesigner from '../hooks/useDesigner';
import { cn } from '../../lib/utils';
import { Box, Stack, Typography } from '@mui/material';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFMultiSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { Label } from '@radix-ui/react-label';
import FieldDialogActionBottomButtons from '../fieldDialogActionBottomButtons';
import {
  IFormElementConstructor,
  IFormOptionList,
  IQPLSpectral,
  ISpectralQTapAndOptionsType,
} from '@/@types/bulider';
import { IOSSwitch } from '@/components/hook-form/RHFSwitchIOS.styled';
import { callApiQuestionCreate, callApiQuestionUpdate } from '@/services/apis/builder';
import RHFTextFieldOptionList from '@/components/hook-form/RHFTextFieldOptionList';

const questionType: ElementsType = 'SPECTRAL';

const questionPropertyList: IQPLSpectral = [
  {
    questionPropertyEnum: 'SPECTRAL_TYPE',
    value: 'CONTINUOUS',
  },
  {
    questionPropertyEnum: 'REQUIRED',
    value: 'false',
  },
  {
    questionPropertyEnum: 'DESCRIPTION',
    value: '',
  },
  {
    questionPropertyEnum: 'SELECTION_TYPE',
    value: 'RANGE',
  },
  {
    questionPropertyEnum: 'STEP',
    value: 1,
  },
  {
    questionPropertyEnum: 'SPECTRAL_START',
    value: 10,
  },
  {
    questionPropertyEnum: 'SPECTRAL_END',
    value: 100,
  },
];

const optionList: IFormOptionList[] = [
  {
    title: 'گزینه 1',
    score: 0,
  },
  {
    title: 'گزینه 2',
    score: 0,
  },
];

const spectralTypeOptions: ISpectralQTapAndOptionsType = [
  { value: 'CONTINUOUS', label: 'پیوسته' },
  { value: 'DISCRETE', label: 'گسسته' },
];

const tapTypeOptions: ISpectralQTapAndOptionsType = [{ value: 'RANGE', label: 'دامنه' }];

const optionsSchema = z.object({
  title: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(
      z
        .string()
        .min(2, { message: 'حداقل 2 و حداکثر 50 کاراکتر داشته باشد' })
        .max(50, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر داشته باشد' })
    ),
  score: z.number(),
});

const propertiesSchema = z
  .object({
    title: z
      .string()
      .transform((value) => value.replace(/\s+/g, ''))
      .pipe(
        z
          .string()
          .min(2, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' })
          .max(50, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' })
      ),
    SELECTION_TYPE: z.string(),
    SPECTRAL_TYPE: z.string(),
    STEP: z
      .number({ invalid_type_error: 'اجباری است' })
      .min(1, { message: 'باید از صفر بزرگتر باشد' }),
    DESCRIPTION: z
      .string()
      .transform((value) => value.replace(/\s+/g, ''))
      .pipe(z.string().max(250, { message: 'حداکثر میتواند 250 کاراکتر باشد' })),
    SPECTRAL_START: z.number({ invalid_type_error: 'اجباری است' }),
    SPECTRAL_END: z
      .number({ invalid_type_error: 'اجباری است' })
      .min(1, { message: 'باید از صفر بزرگتر باشد' }),
    REQUIRED: z.boolean().default(false),
    optionList: z
      .array(optionsSchema)
      .min(2, { message: 'حداقل باید 2 و حداکثر 10 گزینه وجود داشته باشد' })
      .max(10, { message: 'حداقل باید 2 و حداکثر 10 گزینه وجود داشته باشد' }),
  })
  .refine((val) => val.SPECTRAL_END >= val.SPECTRAL_START, {
    message: 'پایان باید بزرگتر یا مساوی با شروع باشد',
    path: ['SPECTRAL_END'],
  })
  .refine((val) => val.SPECTRAL_END - val.SPECTRAL_START >= val.STEP, {
    message: 'گام نمیتواند از پایان بیشتر باشد',
    path: ['STEP'],
  });

export const SpectralFormElement: FormElement = {
  questionType,
  construct: ({
    questionId,
    questionGroupId,
    formId,
    title,
    position,
  }: IFormElementConstructor) => ({
    questionId,
    questionGroupId,
    formId,
    title,
    questionType,
    position,
    questionPropertyList: questionPropertyList,
    optionList: optionList,
  }),
  designerBtnElement: {
    label: 'طیفی',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.questionPropertyList.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  questionPropertyList: typeof questionPropertyList;
  optionList: typeof optionList;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const labelText = element.title;
  const designerBtnLabel = SpectralFormElement.designerBtnElement.label;

  return (
    <div className="flex items-start w-full flex-col" dir="rtl">
      <p dir="rtl" className="text-base">
        {labelText}
      </p>
      <p className="text-xs">{designerBtnLabel}#</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder } = element.questionPropertyList;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && ' *'}
      </Label>
      <Input
        className={cn(error && 'border-red-500')}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = SpectralFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element?.questionId, e.target.value);
        }}
        value={value}
      />
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const descriptionSwitchStatus: boolean = element.questionPropertyList.some((property) => {
    if (property.questionPropertyEnum === 'DESCRIPTION') {
      return property.value ? true : false;
    } else {
      return false;
    }
  });

  const [openDescriptionSwitch, setOpenDescriptionSwitch] =
    useState<boolean>(descriptionSwitchStatus);
  const {
    updateElement,
    setSelectedElement,
    setOpenDialog,
    elements,
    addElement,
    selectedElement,
  } = useDesigner();

  const defaultValues = element.questionPropertyList.reduce((acc: any, attribute: any) => {
    if (attribute.questionPropertyEnum === 'REQUIRED') {
      acc[attribute.questionPropertyEnum] = attribute.value === 'true' ? true : false;
    } else if (
      attribute.questionPropertyEnum === 'SPECTRAL_START' ||
      attribute.questionPropertyEnum === 'SPECTRAL_END' ||
      attribute.questionPropertyEnum === 'STEP'
    ) {
      acc[attribute.questionPropertyEnum] = attribute.value === '' ? 0 : Number(attribute.value);
    } else if (attribute.questionPropertyEnum === 'DESCRIPTION') {
      acc[attribute.questionPropertyEnum] = attribute.value === null ? '' : attribute.value;
    } else {
      acc[attribute.questionPropertyEnum] = attribute.value;
    }
    return acc;
  }, {});
  defaultValues.title = element.title;
  defaultValues.optionList = element.optionList;

  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // useEffect(() => {
  //   form.reset(element.questionPropertyList);
  // }, [element, form]);

  async function onSubmit(values: propertiesFormSchemaType) {
    const {
      title,
      DESCRIPTION,
      REQUIRED,
      SPECTRAL_TYPE,
      SELECTION_TYPE,
      STEP,
      SPECTRAL_START,
      SPECTRAL_END,
      optionList,
    } = values;

    // ? finds whether a field is selected or not
    const selectedYet = elements?.find((el) => el?.questionId === element?.questionId);

    const data = [
      {
        questionPropertyEnum: 'SPECTRAL_TYPE',
        value: SPECTRAL_TYPE,
      },
      {
        questionPropertyEnum: 'REQUIRED',
        value: REQUIRED ? 'true' : 'false',
      },
      {
        questionPropertyEnum: 'DESCRIPTION',
        value: openDescriptionSwitch && DESCRIPTION ? DESCRIPTION : null,
      },
      {
        questionPropertyEnum: 'SELECTION_TYPE',
        value: SELECTION_TYPE,
      },
      {
        questionPropertyEnum: 'STEP',
        value: STEP,
      },
      {
        questionPropertyEnum: 'SPECTRAL_START',
        value: SPECTRAL_START,
      },
      {
        questionPropertyEnum: 'SPECTRAL_END',
        value: SPECTRAL_END,
      },
    ];

    const optionListData = optionList;

    const lastIndexOfGroup = elements.findLastIndex(
      (el) => el.questionGroupId === selectedElement?.fieldElement?.questionGroupId
    );

    const group = elements.filter(
      (el) => el.questionGroupId === selectedElement?.fieldElement?.questionGroupId
    );

    delete element.temp;

    const finalFieldData = {
      ...element,
      title,
      position: selectedElement?.position?.apiPosition ?? group.length,
      questionPropertyList: data,
      optionList: optionListData,
    };

    if (!selectedYet) {
      try {
        const response: any = await callApiQuestionCreate(finalFieldData);
        addElement(selectedElement?.position?.realPosition ?? lastIndexOfGroup + 1, response.data);
        setOpenDialog(false);
        setSelectedElement(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response: any = await callApiQuestionUpdate(
          finalFieldData.questionId,
          finalFieldData
        );

        updateElement(element.questionId, response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingX: 1.5,
          direction: 'ltr',
          width: '100%',
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2">متن سوال:</Typography>
          <RHFTextField multiline rows={3} name="title" />
        </Stack>

        <Stack spacing={1} marginTop={2.5}>
          <Typography variant="subtitle2">نوع نوار لغزان:</Typography>
          <RHFMultiSelect name="SELECTION_TYPE" options={tapTypeOptions} />
        </Stack>

        <Stack spacing={1} marginTop={2.5}>
          <Typography variant="subtitle2">نوع انتخاب:</Typography>
          <RHFMultiSelect name="SPECTRAL_TYPE" options={spectralTypeOptions} />
        </Stack>

        <Stack justifyContent="space-between" alignItems="flex-start" marginTop={2.5}>
          <Typography variant="subtitle2">گام:</Typography>
          <RHFTextField name="STEP" type="number" />
        </Stack>

        <Stack flexDirection="row" gap={2} spacing={1} alignItems="baseline" marginTop={2.5}>
          <Box>
            <Typography variant="subtitle2">شروع:</Typography>
            <RHFTextField name="SPECTRAL_START" type="number" />
          </Box>
          <Box>
            <Typography variant="subtitle2">پایان:</Typography>
            <RHFTextField name="SPECTRAL_END" type="number" />
          </Box>
        </Stack>

        <Stack>
          <RHFTextFieldOptionList
            name="optionList"
            watch={watch as any}
            setValue={setValue as any}
            getValues={getValues as any}
          />
        </Stack>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={3}
        >
          <Typography variant="subtitle2">پاسخ به سوال اجباری باشد</Typography>
          <RHFSwitch
            label=""
            name="REQUIRED"
            labelPlacement="start"
            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
          />
        </Stack>

        <Stack
          spacing={1}
          marginTop={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography variant="subtitle2">توضیحات</Typography>
          <IOSSwitch
            onChange={() => setOpenDescriptionSwitch(!openDescriptionSwitch)}
            checked={openDescriptionSwitch}
          />
        </Stack>

        {openDescriptionSwitch && (
          <Stack marginTop={2}>
            <Typography variant="subtitle2" marginBottom={1.5}>
              متن توضیح:
            </Typography>
            <RHFTextField
              name="DESCRIPTION"
              placeholder="پیامی برای توضیح بیشتر در مورد این سوال"
            />
          </Stack>
        )}

        <FieldDialogActionBottomButtons status={isSubmitting} />
      </Box>
    </FormProvider>
  );
}
