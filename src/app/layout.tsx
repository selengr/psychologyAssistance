import './globals.css';
// i18n
import '../locales/i18n';

// scroll bar
// import 'simplebar-react/dist/simplebar.min.css';

// ----------------------------------------------------------------------

// import { CacheProvider, EmotionCache } from '@emotion/react';

// next
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import localFont from 'next/font/local';

const IranSansFont = localFont({
  src: '../../public/fonts/IranSans/IRANSansMobile(FaNum)_Medium.ttf',
});

// redux
// import { store } from '../redux/store';
// import { Provider as ReduxProvider } from 'react-redux';
// @mui

// utils
// import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';

// locales
import ThemeLocalization from '../locales';

// components
import { MotionLazyContainer } from '../components/animate';
import { Toaster } from '@/formBuilder/components/ui/toaster';
import { ThemeSettings, SettingsProvider } from '../components/settings';
import { ReduxProvider } from '@/redux/provider';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export const metadata: Metadata = {
  title: 'سایا',
  description: 'دستیار روان شناس شخصی',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <html lang="fa">
      <body className={`${IranSansFont.className}`}>
        <NextTopLoader color="#DE74A3" showSpinner={false} />
        {/* <CacheProvider value={emotionCache}> */}
        {/* <AuthProvider> */}
        <ReduxProvider>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ThemeLocalization>
                    <DashboardLayout>{children}</DashboardLayout>
                  </ThemeLocalization>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
          {/* </LocalizationProvider> */}
        </ReduxProvider>
        {/* </AuthProvider> */}
        {/* </CacheProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
