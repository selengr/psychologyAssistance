'use client';

import { formSchema, formSchemaType } from '@/formBuilder/schemas/form';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CreateForm } from '@/actions/form';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import callApi from '@/services/axios';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { LoadingButton } from '@mui/lab';
import { Direction } from '@dnd-kit/core/dist/types';

function CreateFormBtn() {
  const router = useRouter();
  const form = useForm<formSchemaType | any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'QUESTION',
    },
  });

  async function onSubmit(values: formSchemaType) {
    try {
      let response: AxiosResponse = await callApi().post('/form', values);
      toast.success('Form created successfully');
      router.push(`/builder/${response?.id}?questionGroup=${response?.questionGroupId}`);
    } catch (error) {
      toast.error('Something went wrong, please try again later');
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات:</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
              className="w-full mt-4"
            >
              {form.formState.isSubmitting || form.formState.isSubmitSuccessful ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                <span>ذخیره</span>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
