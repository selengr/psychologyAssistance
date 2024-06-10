'use client';

import { useEffect } from 'react';
import { ElementsType, FormElement, FormElementInstance } from '../FormElements';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDesigner from '../hooks/useDesigner';
import { toast } from '../ui/use-toast';
import { Box, Stack, Typography } from '@mui/material';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFTextField } from '@/components/hook-form';
import FieldDialogActionBottomButtons from '../fieldDialogActionBottomButtons';

const questionType: ElementsType = 'TitleFieldStart';

const questionPropertyList = {
  title: '',
  label: 'صفحه شروع پرسشنامه',
};

const propertiesSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'باید حداقل 2 و حداکثر 50 کاراکتر باشد',
    })
    .max(50, {
      message: 'باید حداقل 2 و حداکثر 50 کاراکتر باشد',
    }),
});

export const TitleFieldStartFormElement: FormElement = {
  questionType,
  construct: (id: string) => ({
    id,
    questionType,
    questionPropertyList,
  }),
  designerBtnElement: {
    label: 'صفحه شروع پرسشنامه',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  questionPropertyList: typeof questionPropertyList;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label } = TitleFieldStartFormElement.designerBtnElement;
  const { title } = element.questionPropertyList;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
        direction: 'rtl',
        justifyContent: 'flex-end',
      }}
    >
      <Typography variant="body2" component={'p'} sx={{ fontSize: '1rem' }}>
        {title}
      </Typography>
      <Typography variant="body2" component={'p'} sx={{ fontSize: '0.7rem' }}>
        {label}#
      </Typography>
    </Box>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { title } = element.questionPropertyList;
  return <p className="text-xl">{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const {
    updateStartPage,
    setOpenDialog,
    setSelectedElement,
    startPage,
    addStartPage,
    selectedElement,
  } = useDesigner();

  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: element.questionPropertyList.title,
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // useEffect(() => {
  //   form.reset(element.questionPropertyList);
  // }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { title } = values;
    const { fieldElement } = selectedElement;

    if (!startPage) {
      addStartPage({
        ...fieldElement,
        questionPropertyList: {
          label: element?.questionPropertyList?.label,
          title,
        },
      } as FormElementInstance);
    } else {
      updateStartPage({
        ...element,
        questionPropertyList: {
          label: element?.questionPropertyList?.label,
          title,
        },
      });
    }

    toast({
      title: 'موفقیت آمیز بود',
      description: 'خصوصیات بصورت موفقیت آمیز ذخیره شدند',
    });

    setOpenDialog(false);
    setSelectedElement(null);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(applyChanges)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          direction: 'ltr',
          width: '100%',
          paddingX: 1.5,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2">توضیحات شروع:</Typography>
          <RHFTextField multiline rows={3} name="label" />
        </Stack>

        <FieldDialogActionBottomButtons status={isSubmitting} />
      </Box>
    </FormProvider>
  );
}
