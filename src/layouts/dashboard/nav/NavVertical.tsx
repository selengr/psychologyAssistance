"use client"
import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import MyRoutes from './Components/Routes';
// import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { ContainerPage } from 'components/common/Container';
import { Box, Grid } from '@mui/material';
import { FooterTab } from '../FooterTab';
import { ScreenSize, userAllData } from '@/utils/utils';
import { StyledLogo } from '@/components/common/Logo';
import { ContainerPage } from '@/components/common/Container';
import { Sidebar } from '@/components/common/Sidebar';
import useResponsive from '@/hooks/useResponsive';


// @ts-ignore

export function NavVertical() {
  const isMobile = useResponsive("down","sm");
  const userData = userAllData();
  const { i18n } = useTranslation();
  const search = (data: any) => {
    
    const filterRoleType = data?.filter((o:any) => o.roleType === userData?.data?.data.last_role_type);
    return filterRoleType.filter((o:any) => o.id === userData?.data?.data.last_role);
  };

  const [role, setRole] = useState<string>('');

  useEffect(() => {
    console.log('isMobile :>> ', isMobile);
    debugger
    console.log('search(userData.roles)[0].userType :>> ', search(userData.roles)[0].userType);
    console.log('search(userData.roles)[0].userType :>> ', userData.roles);
    userData.loggedIn && setRole(search(userData.roles)[0].userType);
  }, []);


  const Sidebar = () => {
    return <ContainerPage userName={search(userData.roles)[0].userName} role={role} roleData={userData.roles} roleId={search(userData.roles)[0].customID} roleType={userData.data.data.role} />;
  };

  // const Content = () => {
  //   return (
  //     <>
  //       {role === 'agent' && <MyRoutes.agents role={userData.data.data.role} />}
  //       {role === 'user' && <MyRoutes.users userName={search(userData.roles)[0].userName} />}
  //       {role === 'scope' && <MyRoutes.scopes />}
  //     </>
  //   );
  // };
  console.log('role :>> ', role);
  return (
    <>
      {/* <Router basename='/app'>
       <Helmet titleTemplate='%s - PSYA' defaultTitle='سامانه ارزیابی سایا' htmlAttributes={{ lang: i18n.language }}>
         <meta name='description' content='سامانه ارزیابی سایا' />
       </Helmet> */}
      {/* {!userData.loggedIn ? (
        <>
          <MyRoutes.unAuth />
        </>
      ) : ( */}
      <Box sx={{ pb: isMobile && role !== 'agent' ? 5 : 0 }}>
        <Grid container>
          {isMobile ? (
            <Grid item container spacing={0} alignItems="center" justifyContent="space-between">
              <Grid item sx={role === 'agent' ? { ml: 'auto' } : { mr: 'auto' }}>
                {role !== 'agent' ? <FooterTab role={role} /> : <Sidebar />}
              </Grid>
              <Grid
                item
                sx={
                  role === 'agent'
                    ? {
                        ml: '15px',
                        mt: '15px',
                        mb: '-10px',
                      }
                    : {
                        ml: 'auto',
                        mt: '15px',
                        mb: '-10px',
                      }
                }
              >
                <StyledLogo />
              </Grid>
            </Grid>
          ) : (
            <Grid item sx={{ width: { md: 300 }, flexShrink: { sm: 0 } }}>
              <Sidebar />
            </Grid>
          )}
          <Grid item sx={{ flexGrow: 1, p: 3, width: { md: 'calc(100% - 300px)' } }}>
            {/* <Content /> */}
          </Grid>
        </Grid>
      </Box>
      {/* )} */}
      {/* </Router> */}
    </>
  );
}
