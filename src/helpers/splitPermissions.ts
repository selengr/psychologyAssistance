import { IPermission } from 'rootApp/core/types/rolesTypes';
import { TCategoryPermission } from 'rootApp/core/types/globalTypes';

export type ISplitPermissions = Record<TCategoryPermission, IPermission[]>;

type TSplitPermissions = (permissions: IPermission[]) => ISplitPermissions;

export const extractCategory = (permission: string): TCategoryPermission =>
  permission.split('/')[1] as TCategoryPermission;
export const splitPermissions: TSplitPermissions = (permissions) => {
  let temp: any = {};
  permissions.forEach((permission) => {
    if (!temp[extractCategory(permission.name)]) {
      temp[extractCategory(permission.name)] = [permission];
    } else {
      temp[extractCategory(permission.name)].push(permission);
    }
  });
  return temp;
};
