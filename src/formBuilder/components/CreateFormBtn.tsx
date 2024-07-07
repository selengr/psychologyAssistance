'use client';

import { formSchemaType } from '@/formBuilder/schemas/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { callApiCreateForm } from '@/services/apis/builder';
import { Box, Dialog, DialogContent, IconButton, Stack, Typography, Button } from '@mui/material';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { z } from 'zod';
import Iconify from '@/components/iconify/Iconify';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

const formTypeOptions = [
  { value: 'TEST', label: 'آزمون' },
  { value: 'QUESTION', label: 'پرسشنامه' },
  { value: 'COMPETITION', label: 'مسابقه' },
];

const propertiesSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' })
    .max(50, { message: 'حداقل باید 2 و حداکثر 50 کاراکتر باشد' }),
  type: z.string(),
});

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function CreateFormBtn() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const methods = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      type: 'QUESTION',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(values: formSchemaType) {
    try {
      const response: any = await callApiCreateForm(values);
      setIsLoadingData(true);
      router.push(`/builder/${response?.data?.id}`);
    } catch (error) {
      console.log('object');
      setIsLoadingData(false);
    }
  }

  function handleClose() {
    setOpenDialog(!openDialog);
  }

  return (
    <>
      <Box
        onClick={handleClose}
        paddingX={1}
        display="flex"
        justifyContent="center"
        paddingY={8}
        border="2px dashed #DDE1E6"
        maxWidth="240px"
        borderRadius={1}
        sx={{
          cursor: 'pointer',
          '&.MuiBox-root:hover': {
            backgroundColor: '#F5F5F5',
          },
        }}
      >
        <Typography>ایجاد فرم جدید</Typography>
      </Box>
      <Dialog
        open={openDialog}
        dir="ltr"
        sx={{
          overflow: 'hidden',
          scrollbarWidth: 'none',
          '& .MuiPaper-root': {
            margin: '10px',
            boxShadow: (theme) => theme?.customShadows?.dialog,
          },
          '& .MuiDialog-container': {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'hsl(0deg 0% 100% / 50%)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ marginX: 0.5, marginTop: 0.5, marginBottom: 0 }}
          >
            <Iconify icon="mingcute:close-line" sx={{ width: 25, height: 25 }} />
          </IconButton>
        </Box>
        <DialogContent
          dir="rtl"
          sx={{
            maxHeight: '75vh',
            height: 'auto',
            scrollbarWidth: 'none',
            maxWidth: '100%',
            width: '450px',
            paddingX: 1,
            paddingBottom: 1,
            paddingTop: 0,
          }}
        >
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
                <RHFTextField name="name" />
              </Stack>

              <Stack spacing={1} marginTop={2.5}>
                <Typography variant="subtitle2">نوع:</Typography>
                <RHFSelect native name="type">
                  {formTypeOptions.map((category) => (
                    <option key={category.label} label={category.label}>
                      {category.value}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>

              <Box display="flex" gap={3} width="100%" marginTop={5} marginBottom={2}>
                <LoadingButton
                  type="submit"
                  disableRipple
                  fullWidth
                  variant="contained"
                  loading={isSubmitting || isLoadingData}
                  sx={{
                    fontWeight: '400',
                    fontSize: '15px',
                    height: '45px',
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: (theme) => theme.palette.primary.main,
                    },
                  }}
                >
                  <Typography variant="body2" component={'p'} py={0.5}>
                    ثبت
                  </Typography>
                </LoadingButton>

                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  sx={{ height: '45px', fontWeight: '400', fontSize: '15px' }}
                  onClick={handleClose}
                >
                  <Typography variant="body2" component={'p'} py={0.5}>
                    انصراف
                  </Typography>
                </Button>
              </Box>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateFormBtn;
