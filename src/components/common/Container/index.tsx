import { useState } from 'react';
// import { Icons, MobileDrawer, WebDrawer } from 'components';
import { Grid, IconButton } from '@mui/material';
// import { ScreenSize } from '../utils/utils';
import { Icons } from '@/components/Icons';
import { StyledMobileDrawer, StyledWebDrawer } from '@/layouts/dashboard/nav/Drawer';
import useResponsive from '@/hooks/useResponsive';
// import { Util } from 'utils';

export function ContainerPage(Props: any) {
  const isMobile = useResponsive('down', 'sm');

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      {isMobile ? (
        <>
          {Props.role === 'agent' && (
            <>
              <IconButton
                className={'icon'}
                onClick={showDrawer}
                sx={{ mr: '15px', mt: '15px', mb: '-10px' }}
              >
                <Icons name="Burger-Menu" size={'web'} />
              </IconButton>
              <StyledMobileDrawer
                scopeName={Props.userName}
                role={Props.role}
                roleData={Props.roleData}
                roleId={Props.roleId}
                roleType={Props.roleType}
                onClose={onClose}
                open={visible}
              />
            </>
          )}
        </>
      ) : (
        <Grid container>
          <Grid item>
            <StyledWebDrawer
              scopeName={Props.userName}
              role={Props.role}
              roleData={Props.roleData}
              roleId={Props.roleId}
              roleType={Props.roleType}
              open
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
