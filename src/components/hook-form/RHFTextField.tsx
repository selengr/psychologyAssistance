import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (other.type === 'number') {
            const value = e.target.value;
            field.onChange(parseFloat(value));
          } else {
            const value = e.target.value;
            field.onChange(value);
          }
        };

        return (
          <TextField
            {...field}
            sx={{
              '& input': {
                padding: 1,
              },
            }}
            fullWidth
            onChange={handleChange}
            value={typeof field.value === 'number' ? Number(field.value) : field.value}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
