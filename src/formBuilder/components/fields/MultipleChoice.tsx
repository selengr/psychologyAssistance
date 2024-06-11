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
import { RHFSwitch, RHFTextField } from '@/components/hook-form';
import { Label } from '@radix-ui/react-label';
import FieldDialogActionBottomButtons from '../fieldDialogActionBottomButtons';
import { IFormElementConstructor, IQPLMultipleChoice } from '@/@types/bulider';
import callApi from '@/services/axios';
import { IOSSwitch } from '@/components/hook-form/RHFSwitchIOS.styled';
import RHFTextFieldOptionList from '@/components/hook-form/RHFTextFieldOptionList';

const questionType: ElementsType = 'MULTIPLE_CHOICE';

const questionPropertyList: IQPLMultipleChoice = [
  {
    questionPropertyEnum: 'MULTIPLE_SELECT',
    value: 'false',
  },
  {
    questionPropertyEnum: 'REQUIRED',
    value: 'false',
  },
  {
    questionPropertyEnum: 'RANDOMIZE_OPTIONS',
    value: 'false',
  },
  {
    questionPropertyEnum: 'DESCRIPTION',
    value: '',
  },
];

const optionList = [
  {
    title: 'گزینه 1',
    score: 0,
  },
  {
    title: 'گزینه 2',
    score: 0,
  },
];

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
  DESCRIPTION: z.string().max(200),
  REQUIRED: z.boolean().default(false),
  RANDOMIZE_OPTIONS: z.boolean().default(false),
  optionList: z.array(z.object({ title: z.string(), score: z.number() })),
});

export const MultipleChoiceFormElement: FormElement = {
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
    label: 'چند گزینه‌ای',
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
  const designerBtnLabel = MultipleChoiceFormElement.designerBtnElement.label;
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
          const valid = MultipleChoiceFormElement.validate(element, e.target.value);
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
    if (
      attribute.questionPropertyEnum === 'REQUIRED' ||
      attribute.questionPropertyEnum === 'RANDOMIZE_OPTIONS' ||
      attribute.questionPropertyEnum === 'MULTIPLE_SELECT'
    ) {
      acc[attribute.questionPropertyEnum] = attribute.value === 'true' ? true : false;
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
    // reset,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ----------------------------------------------------------------------

  // useEffect(() => {
  //   form.reset(element.questionPropertyList);
  // }, [element, form]);

  async function onSubmit(values: propertiesFormSchemaType) {
    const { title, DESCRIPTION, REQUIRED, RANDOMIZE_OPTIONS, MULTIPLE_SELECT, optionList } = values;

    // finds whether a field is selected or not
    const selectedYet = elements?.find((el) => el?.questionId === element?.questionId);

    const data = [
      {
        questionPropertyEnum: 'MULTIPLE_SELECT',
        value: MULTIPLE_SELECT,
      },
      {
        questionPropertyEnum: 'RANDOMIZE_OPTIONS',
        value: RANDOMIZE_OPTIONS,
      },
      {
        questionPropertyEnum: 'REQUIRED',
        value: REQUIRED ? 'true' : 'false',
      },
      {
        questionPropertyEnum: 'DESCRIPTION',
        value: openDescriptionSwitch ? DESCRIPTION : '',
      },
    ];

    const optionListData = optionList;

    const finalFieldData = {
      ...element,
      title,
      position: selectedElement?.position ?? elements.length,
      questionPropertyList: data,
      optionList: optionListData,
    };
    delete finalFieldData.temp;

    if (!selectedYet) {
      try {
        const response = await callApi().post('/question', finalFieldData);
        addElement(selectedElement!.position ?? elements.length, response);
        setOpenDialog(false);
        setSelectedElement(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await callApi().put(
          '/question/' + finalFieldData.questionId,
          finalFieldData
        );
        updateElement(element.questionId, response);
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

        <Stack>
          <RHFTextFieldOptionList
            name="optionList"
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
        </Stack>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={3}
        >
          <Typography variant="subtitle2">چند انتخابی</Typography>
          <RHFSwitch
            label=""
            name="MULTIPLE_SELECT"
            labelPlacement="start"
            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
          />
        </Stack>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={1.5}
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
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={1.5}
        >
          <Typography variant="subtitle2">توضیع تصادفی گزینه‌ها</Typography>
          <RHFSwitch
            label=""
            name="RANDOMIZE_OPTIONS"
            labelPlacement="start"
            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
          />
        </Stack>

        <Stack
          marginTop={1.5}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="subtitle2">توضیحات</Typography>
          <IOSSwitch
            onChange={() => setOpenDescriptionSwitch(!openDescriptionSwitch)}
            defaultValue={openDescriptionSwitch}
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
