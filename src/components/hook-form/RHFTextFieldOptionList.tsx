import {
  useFormContext,
  Controller,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import Iconify from '../iconify/Iconify';

type Option = {
  title: string;
  score: number;
};

type PropTypes = {
  name: string;
  watch: UseFormWatch<{
    title: string;
    REQUIRED: boolean;
    DESCRIPTION: string;
    RANDOMIZE_OPTIONS: boolean;
    MULTI_SELECT: boolean;
    optionList: Option[];
  }>;
  setValue: UseFormSetValue<{
    title: string;
    DESCRIPTION: string;
    REQUIRED: boolean;
    RANDOMIZE_OPTIONS: boolean;
    MULTI_SELECT: boolean;
    optionList: Option[];
  }>;
  getValues: UseFormGetValues<{
    title: string;
    REQUIRED: boolean;
    DESCRIPTION: string;
    RANDOMIZE_OPTIONS: boolean;
    MULTI_SELECT: boolean;
    optionList: Option[];
  }>;
};

export default function RHFTextFieldOptionList({ name, watch, setValue, getValues }: PropTypes) {
  const { control } = useFormContext();

  function convertErrorMessage(error: any[]) {
    if (Array.isArray(error)) {
      const foundError = error?.find((item) => item?.title?.message);
      return foundError?.title?.message;
    }
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const optionListErrorMessage = convertErrorMessage(error as unknown as never);
          return (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop={3}
                marginBottom={0.5}
              >
                <Typography sx={{ width: '75%' }}>گزینه ها</Typography>
                <Typography sx={{ width: '12.5%' }}>ارزش</Typography>
                <Typography sx={{ width: '12.5%' }}></Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                {watch(name as any)?.map((option: any, index: number) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={0.8}
                  >
                    <TextField
                      fullWidth
                      sx={{
                        '& input': {
                          padding: 1,
                        },
                      }}
                      error={!!optionListErrorMessage}
                      placeholder="گزینه جدید"
                      value={option?.title}
                      onChange={(e) => {
                        const newOptions = [...field.value];
                        newOptions[index].title = e.target.value;
                        field.onChange(newOptions);
                      }}
                    />
                    <TextField
                      sx={{
                        width: '20%',
                        '& input': {
                          textAlign: 'center',
                          padding: 1,
                        },
                      }}
                      placeholder="0..99"
                      type="number"
                      value={option?.score}
                      onChange={(e) => {
                        const newOptions = [...field.value];
                        newOptions[index].score = Number(e.target.value);
                        field.onChange(newOptions);
                      }}
                    />
                    <IconButton
                      aria-label="trash"
                      onClick={(e) => {
                        e.preventDefault();
                        if (getValues()?.optionList?.length <= 1) return;
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                      sx={{
                        marginBottom: 0,
                        borderRadius: '5px',
                        border: '1px solid transparent',
                        borderColor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <Iconify icon="ph:trash" sx={{ width: 20, height: 20 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Stack
                flexDirection="row-reverse"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row-reverse"
                  justifyContent="space-between"
                >
                  <Button
                    disableRipple={true}
                    sx={{
                      left: 0,
                      gap: 2,
                      marginTop: 1.5,
                      '&.MuiButtonBase-root:hover': {
                        bgcolor: (theme) => theme.palette.primary.main,
                      },
                    }}
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault(); // avoid submit
                      if (getValues()?.optionList?.length >= 11) return;
                      const newOption = { title: '', score: 0 };
                      setValue(name as any, [...field.value, newOption]);
                    }}
                  >
                    <Typography variant="body2" component={'p'} py={0.5}>
                      افزودن گزینه
                    </Typography>
                  </Button>
                </Box>
                <Typography sx={{ fontSize: '12px', color: 'red', flex: '1 1' }}>
                  {!optionListErrorMessage ? error?.message : optionListErrorMessage}
                </Typography>
              </Stack>
            </Box>
          );
        }}
      />
    </>
  );
}
