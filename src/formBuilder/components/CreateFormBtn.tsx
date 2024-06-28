'use client';

import { formSchemaType } from '@/formBuilder/schemas/form';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { callApiCreateForm } from '@/services/apis/builder';
import { Box, Stack, Typography } from '@mui/material';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import FieldDialogActionBottomButtons from './fieldDialogActionBottomButtons';
import { z } from 'zod';

const formTypeOptions = [
  { value: 'TEST', label: 'آزمون' },
  { value: 'QUESTION', label: 'پرسشنامه' },
  { value: 'SURVEY', label: 'نظرسنجی' },
  { value: 'COMPETITION', label: 'مسابقه' },
];

const propertiesSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' })
    .max(50, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' }),
  FORM_TYPE: z.string(),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function CreateFormBtn() {
  const router = useRouter();
  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      FORM_TYPE: 'QUESTION',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(values: formSchemaType) {
    try {
      const response: any = await callApiCreateForm(values);
      toast.success('Form created successfully');
      router.push(`/builder/${response?.data?.id}`);
    } catch (error) {
      console.log('object');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="group text-center border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary text-center">
            ساخت پرشسنامه جدید
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex text-center justify-center items-center">
          <DialogTitle>ساخت پرسشنامه</DialogTitle>
        </DialogHeader>
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
              <Typography variant="subtitle2">عنوان پرسشنامه:</Typography>
              <RHFTextField name="title" />
            </Stack>

            <Stack spacing={1} marginTop={2.5}>
              <Typography variant="subtitle2">نوع:</Typography>
              <RHFSelect native name="FORM_TYPE">
                {formTypeOptions.map((category) => (
                  <option key={category.label} label={category.label}>
                    {category.value}
                  </option>
                ))}
              </RHFSelect>
            </Stack>

            <FieldDialogActionBottomButtons status={isSubmitting} />
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
