'use client';

import { useState } from 'react';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// auth
// import AuthGuard from '../../auth/AuthGuard';
// components
import { useSettingsContext } from '../../components/settings';
//
import Main from './Main';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import Header from './header/Header';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose}/>;

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          {!isDesktop && <Header onOpenNav={handleOpen} /> }
          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Box
            sx={{
              display: { lg: 'flex' },
              minHeight: { lg: 1 },
              height: "100vh",
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
            height: "100vh",
          }}
        >
           {!isDesktop &&  <Header onOpenNav={handleOpen} /> }
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return <> {renderContent()} </>;
}
