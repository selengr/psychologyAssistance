import { onChangeTextField } from 'rootApp/helpers/formatPhoneNumber';

export const extractNumber = (value: string | onChangeTextField) =>
  typeof value === 'string' ? value.replace(/\D/g, '') :
    (value?.target?.value ?? '').replace(/\D/g, '');
