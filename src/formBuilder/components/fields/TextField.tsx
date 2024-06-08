'use client';

import { useEffect, useState } from 'react';
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from '../FormElements';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDesigner from '../hooks/useDesigner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';
import { cn } from '../../lib/utils';
import { Separator } from '@radix-ui/react-select';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Label } from '@radix-ui/react-label';

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'متنی',
  helperText: '',
  required: false,
  placeHolder: 'متنی',
  pattern: 'numeric',
};

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
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  pattern: z.string(),
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string, groupId, temp: boolean) => ({
    id,
    type,
    groupId,
    temp,
    extraAttributes,
  }),
  designerBtnElement: {
    label: 'متنی',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const designerBtnLabel = TextFieldFormElement.designerBtnElement.label;
  const { label, required } = element.extraAttributes;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="body2"
        component={'p'}
        sx={{ fontSize: '1rem', '& .MuiTypography-root': { direction: 'rtl' } }}
      >
        {label}
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

  const { label, required, placeHolder } = element.extraAttributes;
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
  const { pattern } = element.extraAttributes;
  const [fieldValue, setValue] = useState(pattern);

  // const form = useForm<propertiesFormSchemaType>({
  //   resolver: zodResolver(propertiesSchema),
  //   mode: 'onSubmit',
  //   defaultValues: {
  //     label: element.extraAttributes.label,
  //     helperText: element.extraAttributes.helperText,
  //     required: element.extraAttributes.required,
  //     placeHolder: element.extraAttributes.placeHolder,
  //     pattern: element.extraAttributes.pattern,
  //   },
  // });

  // ----------------------------------------------------------------------

  type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

  const defaultValues = {
    label: element.extraAttributes.label,
    helperText: element.extraAttributes.helperText,
    required: element.extraAttributes.required,
    placeHolder: element.extraAttributes.placeHolder,
    pattern: element.extraAttributes.pattern,
  };

  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    reset,
    watch,
    // setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  // ----------------------------------------------------------------------

  // useEffect(() => {
  //   form.reset(element.extraAttributes);
  // }, [element, form]);

  //   function applyChanges(values: propertiesFormSchemaType) {
  //     const { label, helperText, placeHolder, required, pattern } = values;
  //     const { fieldElement, position } = selectedElement;

  //     // finds whether a field is selected or not
  //     const selectedYet = elements?.find((el) => el?.id === element?.id);

  //     if (!selectedYet) {
  //       fieldElement.temp = false;
  //       addElement(position ?? elements.length, {
  //         ...fieldElement,
  //         extraAttributes: {
  //           label,
  //           helperText,
  //           placeHolder,
  //           required,
  //           pattern,
  //         },
  //       } as FormElementInstance);
  //     } else {
  //       updateElement(element.id, {
  //         ...element,
  //         extraAttributes: {
  //           label,
  //           helperText,
  //           placeHolder,
  //           required,
  //           pattern,
  //         },
  //       });
  //     }

  //     toast({
  //       title: 'موفقیت آمیز بود',
  //       description: 'خصوصیات بصورت موفقیت آمیز ذخیره شدند',
  //     });

  //     setOpenDialog(false);
  //     setSelectedElement(null);
  //   }

  //   return (
  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(applyChanges)} dir="rtl" className="space-y-3">
  //         <FormField
  //           control={form.control}
  //           name="label"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>متن سوال:</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   {...field}
  //                   onKeyDown={(e) => {
  //                     if (e.key === 'Enter') e.currentTarget.blur();
  //                   }}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name="pattern"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>الگوی فیلد پاسخ: </FormLabel>
  //               <FormControl>
  //                 <Select
  //                   dir="rtl"
  //                   value={fieldValue}
  //                   onValueChange={(value) => {
  //                     setValue(value);
  //                     field.onChange(value);
  //                   }}
  //                 >
  //                   <SelectTrigger>
  //                     <SelectValue placeholder={pattern} />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     {fieldOptions.map(({ type, value }) => (
  //                       <SelectItem key={type} value={type}>
  //                         {value}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select>
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name="helperText"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>توضیحات</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   {...field}
  //                   placeholder="توضیحات"
  //                   onKeyDown={(e) => {
  //                     if (e.key === 'Enter') e.currentTarget.blur();
  //                   }}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name="required"
  //           render={({ field }) => (
  //             <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
  //               <div className="space-y-0.5">
  //                 <FormLabel>پاسخ به سوال اجباری باشد</FormLabel>
  //               </div>
  //               <FormControl>
  //                 <Switch dir="ltr" checked={field.value} onCheckedChange={field.onChange} />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <Separator />
  //         <div className="flex justify-between">
  //           <Button className="flex-1 ml-2" type="submit">
  //             ثبت
  //           </Button>
  //           <Button
  //             className="flex-1 mr-2"
  //             variant="outline"
  //             onClick={() => {
  //               setOpenDialog(false);
  //               setSelectedElement(null);
  //             }}
  //           >
  //             انصراف
  //           </Button>
  //         </div>
  //       </form>
  //     </Form>
  //   );
  // }

  function onSubmit(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, pattern } = values;
    const { fieldElement, position } = selectedElement;

    // finds whether a field is selected or not
    const selectedYet = elements?.find((el) => el?.id === element?.id);

    if (!selectedYet) {
      fieldElement.temp = false;
      addElement(position ?? elements.length, {
        ...fieldElement,
        extraAttributes: {
          label,
          helperText,
          placeHolder,
          required,
          pattern,
        },
      } as FormElementInstance);
    } else {
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          label,
          helperText,
          placeHolder,
          required,
          pattern,
        },
      });
    }

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
          direction:"ltr"
        }}
      >
        <Stack spacing={3}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            متن سوال:
          </Typography>
          <RHFTextField name="label" />

          <Stack spacing={3}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              الگوی فیلد پاسخ:
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <RHFSelect native name="category" label="Category">
              {fieldOptions.map((category) => (
                <option key={category.type} label={category.value}>
                  {category.value}
                </option>
              ))}
            </RHFSelect>
          </Stack>

          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            توضیحات
          </Typography>
          <RHFTextField rows={5}  name="helperText" />
        </Stack>

        <Stack spacing={3}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            پاسخ به سوال اجباری باشد
          </Typography>
          <RHFSwitch
            name="required"
            label=""
            labelPlacement="start"
            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
          />
        </Stack>
        {/* <RHFSelect
            name="required"
            size="small"
            helperText={'Size Chart'}
            sx={{
              maxWidth: 96,
              '& .MuiFormHelperText-root': {
                mx: 0,
                mt: 1,
                textAlign: 'right',
              },
            }}
          >
            {fieldOptions.map((size) => (
              <MenuItem key={size.value} value={size.value}>
                {size.value}
              </MenuItem>
            ))}
          </RHFSelect> */}
        {/* </Stack> */}

        {/* 
        name="pattern"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel> </FormLabel> */}
        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          <Button
            // fullWidth
            color="inherit"
            // variant="outlined"
            // size="large"
            // onClick={handleOpenPreview}
          >
            canseddfskg
          </Button>

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Post
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
