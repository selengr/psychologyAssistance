import DesignerContextProvider from '@/formBuilder/components/context/DesignerContext';
import { ThemeProvider } from '@/formBuilder/components/providers/ThemeProvider';
import { Toaster } from '@/formBuilder/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import ThemeSwitcher from '@/formBuilder/components/ThemeSwitcher';
import { UserButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    // <ClerkProvider>
      <DesignerContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
            {/* <UserButton afterSignOutUrl="/sign-in" /> */}
          </div>
          {children}

          <Toaster />
          {/* <Toaster richColors /> */}
        </ThemeProvider>
      </DesignerContextProvider>
    // </ClerkProvider>
  );
}

export default Layout;
