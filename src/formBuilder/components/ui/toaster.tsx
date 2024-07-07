'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/formBuilder/components/ui/toast';
// import { useToast } from "@/formBuilder/components/ui/use-toast";

export function Toaster() {
  // const { toasts } = useToast();

  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  );
}
