// import { memo } from 'react';
import { MenuItem } from '@mui/material';
import { messages } from '../../messages';
import { useTranslation } from 'react-i18next';
// import { GetMe } from '@/utils/utils';
import { StyledDropDown } from '../DropDown';
// import { profileHttp } from '@/services/psya_services/core';

interface Props {
  roleId: number;
  roleData: any;
}

const setRole = async (data: any) => {
  const reqData = {
    owner_id: data.id,
    role_type: data.roleType,
  };
  try {
    console.log('');
    // const result = await profileHttp.setLastRole(reqData);
    // if (result.data.success) {
    //   await GetMe();
    //   window.location.reload();
    //   window.location.href = '/app/';
    // }
  } catch (e) {}
};
export const RoleSelector = ({ roleId, roleData }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledDropDown
        id={'id'}
        placeholder={`${t(messages.Input_ComponentsCommonRoleSelector_Choose())}`}
        value={roleId}
        onChange={(e) =>
          setRole(roleData?.filter((item: any) => item.customID === e.target.value)[0])
        }
      >
        {roleData.map((item: any) => {
          return (
            <MenuItem key={item.customID} value={item.customID}>
              {item.name}
            </MenuItem>
          );
        })}
      </StyledDropDown>
    </>
  );
};
