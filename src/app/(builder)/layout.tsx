import DesignerContextProvider from '@/formBuilder/components/context/DesignerContext';
import { Toaster } from '@/formBuilder/components/ui/toaster';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
      <DesignerContextProvider>
          {children}
          <Toaster />
          {/* <Toaster richColors /> */}
      </DesignerContextProvider>
  );
}

export default Layout;
