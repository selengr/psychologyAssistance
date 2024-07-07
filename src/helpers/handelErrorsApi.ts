import { toast } from 'sonner';

export const handelErrorsApi = (error: any) => {
  if (!error) {
    toast.error('درخواست شما با خطا مواجه شده است مجددا تلاش کنید', {
      duration: 3500,
    });
  } else if ((!!error?.errors && typeof error.errors === 'object') || typeof error === 'object') {
    Object.values(error?.errors ?? error ?? []).forEach((item) => {
      if (Array.isArray(item)) item.forEach((message) => toast.error(message));
      if (typeof item === 'string') toast.error(item);
    });
  } else if (typeof error.errors === 'string') {
    toast.error(error.errors);
  } else if (typeof error.message === 'string') {
    toast.error(error.message);
  } else if (typeof error === 'string') {
    toast.error(error);
  } else {
    toast.error('درخواست شما با خطا مواجه شده است مجددا تلاش کنید', {
      duration: 3500,
    });
  }
};
