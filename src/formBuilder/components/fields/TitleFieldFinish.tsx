'use client';

import { useEffect } from 'react';
import { ElementsType, FormElement, FormElementInstance } from '../FormElements';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDesigner from '../hooks/useDesigner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Separator } from '@radix-ui/react-select';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Box, Typography } from '@mui/material';

const type: ElementsType = 'TitleFieldFinish';

const extraAttributes = {
  title: '',
  label: 'صفحه پایان',
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

export const TitleFieldFinishFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    label: 'عنوان صفحه پایان',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label } = TitleFieldFinishFormElement.designerBtnElement;
  const { title } = element.extraAttributes;

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

  const { title } = element.extraAttributes;
  return <p className="text-xl">{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const {
    updateFinishPage,
    setOpenDialog,
    setSelectedElement,
    finishPage,
    addFinishPage,
    selectedElement,
  } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { title } = values;
    const { fieldElement } = selectedElement;

    if (!finishPage) {
      addFinishPage({
        ...fieldElement,
        extraAttributes: {
          label: element.extraAttributes.label,
          title,
        },
      } as FormElementInstance);
    } else {
      updateFinishPage({
        ...element,
        extraAttributes: {
          label: element.extraAttributes.label,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} dir="rtl" className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان صفحه:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="عنوان..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex justify-between">
          <Button className="flex-1 ml-2" type="submit">
            ثبت
          </Button>
          <Button
            className="flex-1 mr-2"
            variant="outline"
            onClick={() => {
              setOpenDialog(false);
              setSelectedElement(null);
            }}
          >
            انصراف
          </Button>
        </div>
      </form>
    </Form>
  );
}
