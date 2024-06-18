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
import { RHFMultiSelect, RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { Label } from '@radix-ui/react-label';
import FieldDialogActionBottomButtons from '../fieldDialogActionBottomButtons';
import {
  IFormElementConstructor,
  IQPLTextField,
  ITextFieldFormPatternOptions,
} from '@/@types/bulider';
import { IOSSwitch } from '@/components/hook-form/RHFSwitchIOS.styled';
import { callApiQuestionCreate, callApiQuestionUpdate } from '@/services/apis/builder';

const questionType: ElementsType = 'TEXT_FIELD';

const questionPropertyList: IQPLTextField = [
  {
    questionPropertyEnum: 'TEXT_FIELD_PATTERN',
    value: 'NATIONAL_CODE',
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
    questionPropertyEnum: 'MINIMUM_LEN',
    value: 0,
  },
  {
    questionPropertyEnum: 'MAXIMUM_LEN',
    value: 255,
  },
];

const fieldPatternOptions: ITextFieldFormPatternOptions = [
  { value: 'SHORT_TEXT', label: 'متن ساده' },
  { value: 'LONG_TEXT', label: 'متن بلند' },
  { value: 'NUMBER', label: 'عددی' },
  { value: 'NATIONAL_CODE', label: 'کدملی' },
  { value: 'DATE', label: 'تاریخ' },
  { value: 'PHONE', label: 'تلفن' },
];

const propertiesSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' })
    .max(50, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' }),
  MINIMUM_LEN: z.number(),
  MAXIMUM_LEN: z.number(),
  DESCRIPTION: z.string().max(250, { message: 'حداکثر میتواند 250 کاراکتر باشد' }),
  REQUIRED: z.boolean().default(false),
  TEXT_FIELD_PATTERN: z.string(),
});

export const TextFieldFormElement: FormElement = {
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
  }),
  designerBtnElement: {
    label: 'متنی',
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
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const designerBtnLabel = TextFieldFormElement.designerBtnElement.label;
  const labelText = element.title;
  const required = element.questionPropertyList.find(
    (property) => property.questionPropertyEnum === 'REQUIRED' && property.value
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        flexDirection: 'column',
        direction: 'rtl',
      }}
    >
      <Typography
        variant="body2"
        component={'p'}
        sx={{ fontSize: '1rem', '& .MuiTypography-root': { direction: 'rtl' } }}
      >
        {required?.value === 'true' && '* '}
        {labelText}
      </Typography>
      <Typography variant="body2" component={'p'} sx={{ fontSize: '0.7rem' }}>
        {designerBtnLabel}#
      </Typography>
    </Box>
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
          const valid = TextFieldFormElement.validate(element, e.target.value);
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
  const isShortTextPatternSelected =
    element.questionPropertyList.find((prop) => prop.questionPropertyEnum === 'TEXT_FIELD_PATTERN')
      ?.value === 'SHORT_TEXT'
      ? true
      : false;
  const [showMinMaxProps, setShowMinMaxProps] = useState<boolean>(isShortTextPatternSelected);
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
      attribute.questionPropertyEnum === 'MINIMUM_LEN' ||
      attribute.questionPropertyEnum === 'MAXIMUM_LEN'
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

  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // useEffect(() => {
  //   form.reset(element.questionPropertyList);
  // }, [element, form]);

  async function onSubmit(values: propertiesFormSchemaType) {
    const { title, DESCRIPTION, REQUIRED, TEXT_FIELD_PATTERN, MAXIMUM_LEN, MINIMUM_LEN } = values;

    // finds whether a field is selected or not
    const selectedYet = elements?.find((el) => el?.questionId === element?.questionId);

    const data = [
      {
        questionPropertyEnum: 'TEXT_FIELD_PATTERN',
        value: TEXT_FIELD_PATTERN,
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
        questionPropertyEnum: 'MAXIMUM_LEN',
        value: MAXIMUM_LEN < 0 || TEXT_FIELD_PATTERN !== 'SHORT_TEXT' ? null : MAXIMUM_LEN,
      },
      {
        questionPropertyEnum: 'MINIMUM_LEN',
        value: MINIMUM_LEN < 0 || TEXT_FIELD_PATTERN !== 'SHORT_TEXT' ? null : MINIMUM_LEN,
      },
    ];

    const finalFieldData = {
      ...element,
      title,
      position: selectedElement?.position ?? elements.length,
      questionPropertyList: data,
    };

    if (!selectedYet) {
      try {
        const response: any = await callApiQuestionCreate(finalFieldData);
        addElement(selectedElement!.position ?? elements.length, response.data);
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
          <Typography variant="subtitle2">الگوی فیلد پاسخ:</Typography>
          <RHFMultiSelect
            name="TEXT_FIELD_PATTERN"
            options={fieldPatternOptions}
            setProp={setShowMinMaxProps}
          />
        </Stack>

        {showMinMaxProps && (
          <Stack flexDirection="row" gap={2} alignItems="baseline" marginTop={2}>
            <Box>
              <Typography variant="subtitle2">حداقل کرکتر مجاز:</Typography>
              <RHFTextField name="MINIMUM_LEN" type="number" />
            </Box>
            <Box>
              <Typography variant="subtitle2">حداکثر کرکتر مجاز:</Typography>
              <RHFTextField name="MAXIMUM_LEN" type="number" />
            </Box>
          </Stack>
        )}

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
