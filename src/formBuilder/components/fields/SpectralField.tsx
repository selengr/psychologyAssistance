'use client';

import { useEffect, useState } from 'react';
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from '../FormElements';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDesigner from '../hooks/useDesigner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';
import { cn } from '../../lib/utils';
import { RiSpectrumLine } from 'react-icons/ri';
import { Slider } from '../ui/slider';
import { Separator } from '@radix-ui/react-select';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
// import ButtonGroup from "../ui/button-group";

const type: ElementsType = 'SpectralField';

const questionPropertyList = {
  label: 'طیفی',
  helperText: '',
  required: false,
  placeHolder: '',
  rows: 3,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export const SpectralFormElement: FormElement = {
  type,
  construct: (id: string, groupId, temp: boolean) => ({
    id,
    type,
    groupId,
    temp,
    questionPropertyList,
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
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required } = element.questionPropertyList;

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <Label>
        {label}
        {required && ' *'}
      </Label>
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

  const { label, required, rows } = element.questionPropertyList;
  const [value, setValue] = useState(defaultValue || Math.round(rows / 2));
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && ' *'}
      </Label>
      {/* <ButtonGroup rows={rows} onChange={(v: any) => setValue(v)} value={value} /> */}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const {
    updateElement,
    setSelectedElement,
    setOpenDialog,
    elements,
    addElement,
    selectedElement,
  } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      label: element.questionPropertyList.label,
      helperText: element.questionPropertyList.helperText,
      required: element.questionPropertyList.required,
      placeHolder: element.questionPropertyList.placeHolder,
      rows: element.questionPropertyList.rows,
    },
  });

  useEffect(() => {
    form.reset(element.questionPropertyList);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, rows } = values;
    const { fieldElement, position } = selectedElement;

    const selectedYet = elements?.find((el) => el?.id === element?.id);

    if (!selectedYet) {
      fieldElement.temp = false;
      addElement(position ?? elements.length, {
        ...fieldElement,
        questionPropertyList: {
          label,
          helperText,
          placeHolder,
          required,
          rows,
        },
      } as FormElementInstance);
    } else {
      updateElement(element.id, {
        ...element,
        questionPropertyList: {
          label,
          helperText,
          placeHolder,
          required,
          rows,
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
      <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان سوال</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="توضیحات"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سطرها {form.watch('rows')}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>اجباری می باشد</FormLabel>
              </div>
              <FormControl>
                <Switch dir="ltr" checked={field.value} onCheckedChange={field.onChange} />
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
