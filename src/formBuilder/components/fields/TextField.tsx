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
import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { Label } from '@radix-ui/react-label';
import FieldDialogActionBottomButtons from '../fieldDialogActionBottomButtons';
import { IFormElementConstructor, IQPLTextField } from '@/@types/bulider';
import callApi from '@/services/axios';
import { errorUtil } from 'zod/lib/helpers/errorUtil';
import { usePathname } from 'next/navigation';

const questionType: ElementsType = 'TEXT_FIELD';

const questionPropertyList: IQPLTextField = [
  {
    questionPropertyEnum: 'pattern',
    value: 'numeric',
  },
  {
    questionPropertyEnum: 'required',
    value: false,
  },
  {
    questionPropertyEnum: 'placeHolder',
    value: 'متنی',
  },
  {
    questionPropertyEnum: 'helperText',
    value: '',
  },
];

const fieldOptions: { type: string; value: string }[] = [
  { type: 'shortText', value: 'متنی کوتاه' },
  { type: 'longText', value: 'متنی بلند' },
  { type: 'numeric', value: 'عددی' },
  { type: 'nationalCode', value: 'کدملی' },
  { type: 'date', value: 'تاریخ' },
  { type: 'email', value: 'ایمیل' },
  { type: 'password', value: 'رمز' },
  { type: 'telephone', value: 'تلفن' },
];

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  pattern: z.string(),
});

export const TextFieldFormElement: FormElement = {
  questionType,
  construct: ({ id, questionGroupId, formId, title, temp }: IFormElementConstructor) => ({
    id,
    questionGroupId,
    formId,
    title,
    questionType,
    temp,
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
  const required = element.questionPropertyList[2].value;

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
        {labelText}
        {required && ' *'}
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
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const path = usePathname();
  const element = elementInstance as CustomInstance;
  const {
    updateElement,
    setSelectedElement,
    setOpenDialog,
    elements,
    addElement,
    selectedElement,
  } = useDesigner();

  const defaultValues = element.questionPropertyList.reduce((acc, attribute) => {
    acc[attribute.questionPropertyEnum] = attribute.value;
    return acc;
  }, {});
  defaultValues.title = element.title;

  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  // ----------------------------------------------------------------------

  // useEffect(() => {
  //   form.reset(element.questionPropertyList);
  // }, [element, form]);

  async function onSubmit(values: propertiesFormSchemaType) {
    const { title, helperText, placeHolder, required, pattern } = values;
    const { position } = selectedElement;

    // finds whether a field is selected or not
    const selectedYet = elements?.find((el) => el?.id === element?.id);

    const data = [
      {
        questionPropertyEnum: 'pattern',
        value: pattern,
      },
      {
        questionPropertyEnum: 'required',
        value: required,
      },
      {
        questionPropertyEnum: 'placeHolder',
        value: placeHolder,
      },
      {
        questionPropertyEnum: 'helperText',
        value: helperText,
      },
    ];

    const sentField = {
      ...element,
      formId: path.split('/')[2],
      title,
      questionPropertyList: data,
    };

    if (!selectedYet) {
      try {
        const response = await callApi().post('/question', sentField);
        sentField.temp = false;
        addElement(position ?? elements.length, sentField as FormElementInstance);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await callApi().put('/question/' + sentField.id, sentField);
        updateElement(element.id, sentField);
      } catch (error) {
        console.error(error);
      }
    }

    console.log(element);

    setOpenDialog(false);
    setSelectedElement(null);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          direction: 'ltr',
          width: '100%',
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2">متن سوال:</Typography>
          <RHFTextField name="title" />
        </Stack>

        <Stack spacing={1} marginTop={2.5}>
          <Typography variant="subtitle2">الگوی فیلد پاسخ:</Typography>
          <RHFSelect native name="pattern">
            {fieldOptions.map((category) => (
              <option key={category.type} label={category.value}>
                {category.value}
              </option>
            ))}
          </RHFSelect>
        </Stack>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={3}
        >
          <Typography variant="subtitle2">پاسخ به سوال اجباری باشد</Typography>
          <RHFSwitch
            name="required"
            labelPlacement="start"
            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
          />
        </Stack>

        <Stack spacing={1} marginTop={2.5} marginBottom={5}>
          <Typography variant="subtitle2">توضیحات</Typography>
          <RHFTextField multiline rows={3} name="helperText" />
        </Stack>

        <FieldDialogActionBottomButtons status={isSubmitting} />
      </Box>
    </FormProvider>
  );
}
