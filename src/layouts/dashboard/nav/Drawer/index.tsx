import { memo, useState } from 'react';
// import styled from 'styled-components.macro'
import { Icons } from '@/components/Icons';
// import { useNavigate } from 'react-router-dom';
import { Drawer } from '@mui/material';

import i18n from 'i18next';
import { messages } from '@/components/messages';
import { LogOut } from '@/utils/utils';
import { StyledTypography } from '@/components/Typography';
import { StyledMenu } from '../Menu';
import { Sidebar } from '@/components/common/Sidebar';
import { RoleSelector } from '@/components/common/RoleSelector';
import { StyledLogo } from '@/components/common/Logo';
import styled from '@emotion/styled';



interface Props {
  roleId: number;
  scopeName: string;
  role: any;
  open: boolean;
  onClose?: any;
  roleData: any;
  roleType: number;
}

export const StyledWebDrawer = ({ role, scopeName, roleId, roleData, roleType, open }: Props) => {debugger
  const [active, setActive] = useState<string>('');

  return (
    <Drawer
      hideBackdrop={true}
      variant='permanent'
      anchor='right'
      open={open}
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 300,
          borderRadius: '12px 0 0 12px',
          border: 0,
        },
      }}
      PaperProps={{ elevation: 1 }}>
      <div style={{ padding: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <StyledLogo />
        </div>

        <div style={{ marginTop: '38px' }}>
          <StyledTypography type={'title2'} variant={'web20'}>
            {scopeName}
          </StyledTypography>
        </div>

        <div style={{ marginTop: '8px' }}>
          <RoleSelector roleId={roleId} roleData={roleData} />
        </div>
      </div>
      <div style={{ paddingLeft: '30px' }}>
        <Sidebar role={role} roleType={roleType} />
      </div>

      <div style={{ marginTop: 'auto', paddingLeft: '30px' }}>
        <StyledMenu
          key={'web-logout'}
          className={'web'}
          icon={<Icons name={'Exit'} active={false} size={'web'} />}
          iconOver={<Icons name={'Exit'} active={true} size={'web'} />}
          value={`${i18n.t(messages.Input_Global_Exit())}`}
          id={'0'}
          active={active === '0'}
          onClick={(e) => {
            LogOut();
            setActive(e.target.id);
          }}
        />
      </div>
    </Drawer>
  );
}

export const StyledMobileDrawer = ({ onClose, open, role, scopeName, roleId, roleData, roleType }: Props) => {
  const [active, setActive] = useState<string>('');
  return (
    <StyledDrawer
      anchor={'right'}
      open={open}
      onClose={onClose}
      sx={{
        width: '250px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '250px',
          boxSizing: 'border-box',
          borderRadius: '12px 0 0 12px',
        },
      }}>
      <div style={{ padding: '20px 30px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <StyledLogo />
        </div>

        <div style={{ marginTop: '30px' }}>
          <StyledTypography type={'title2'} variant={'mobile12'}>
            {scopeName}
          </StyledTypography>
        </div>

        <div style={{ marginTop: '10px' }}>
          <RoleSelector roleId={roleId} roleData={roleData} />
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <Sidebar role={role} roleType={roleType} />
      </div>

      <div style={{ marginTop: 'auto' }}>
        <StyledMenu
          key={'mobile-logout'}
          className={'mobile'}
          icon={<Icons name={'Exit'} active={false} size={'mobile'} />}
          iconOver={<Icons name={'Exit'} active={true} size={'mobile'} />}
          value={`${i18n.t(messages.Input_Global_Exit())}`}
          id={'0'}
          active={active === '0'}
          onClick={(e) => {
            LogOut();
            setActive(e.target.id);
          }}
        />
      </div>
    </StyledDrawer>
  );
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  overflow: 'hidden !important',
}));
