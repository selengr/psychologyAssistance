import DesignerContextProvider from '@/formBuilder/components/context/DesignerContext';
import { Toaster } from 'sonner';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <DesignerContextProvider>
      {children}
      <Toaster />
    </DesignerContextProvider>
  );
}

export default Layout;
