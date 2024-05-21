import { KEY_API } from 'rootApp/core/enum/enumGlobal';
import { IRoles } from 'rootApp/core/types/rolesTypes';

type keys =
  | 'permissionListApi'
  | 'roleListApi'
  | 'assignPermissionToRoleApi'
  | 'revokePermissionToRoleApi'
  | 'addRoleApi'
  | 'userListApi'
  | 'getUserApi'
  | 'updateUserDataPersonalApi'
  | 'updateUserPasswordApi'
  | 'updateDeviceCountApi'
  | 'updateActiveUserApi'
  | 'getDevicesUserApi'
  | 'revokeRoleUserApi'
  | 'assignRoleUserApi'
  | 'getListPropertiesBuildingApi'
  | 'getListAllBuildingApi'
  | 'getListOwnBuildingApi'
  | 'deletePropertiesBuildingApi'
  | 'deletePropertiesBuildingValueApi'
  | 'addPropertiesBuildingValueApi'
  | 'addValuePropertiesBuildingValueApi'
  | 'createBuildingApi'
  | 'getBuildingWithIdApi'
  | 'similarToAnotherBuildingApi'
  | 'setStateBuildingApi'
  | 'setNextReviewBuildingApi'
  | 'getPropertiesApi'
  | 'blockUserApi'
  | 'unblockUserApi'
  | 'deleteDeviceCount'
  | 'setDeviceCount'
  | 'getPersonsReceiverShareApi'
  | 'getPersonsSenderShareApi'
  | 'getRelatedPersonApi'
  | 'getPersonsRelatedBuildingApi'
  | 'searchUserApi'
  | 'updateSetStatusBuildingApi'
  | 'updateChangeForceBuildingApi'
  | 'updateChangeDoneBuildingApi'
  | 'reviewBuildingApi';

type TCheckPermissionForCall = (
  permissionsUser: IRoles[],
  keys: keys | keys[]
) => boolean;

const permissionApis: { [key in keys]: string } = {
  permissionListApi: `${KEY_API}/manage/permission/list`,
  roleListApi: `${KEY_API}/manage/role/list`,
  assignPermissionToRoleApi: `${KEY_API}/manage/role/permissions/assign`,
  revokePermissionToRoleApi: `${KEY_API}/manage/role/permissions/revoke`,
  addRoleApi: `${KEY_API}/manage/role/create`,
  userListApi: `${KEY_API}/user/list`,
  getUserApi: `${KEY_API}/user/{id}`,
  blockUserApi: `${KEY_API}/user/block-device/{user_id}/{id}`,
  unblockUserApi: `${KEY_API}/user/block-device/{user_id}/{id}`,
  deleteDeviceCount: `${KEY_API}/user/devices/delete/user_id/{id}`,
  setDeviceCount: `${KEY_API}/user/set-device-count/{id}`,
  updateUserDataPersonalApi: `${KEY_API}/user/update/{id}`,
  updateUserPasswordApi: `${KEY_API}/user/password/change/{id}`,
  updateDeviceCountApi: `${KEY_API}/user/inc-device-count/{id}`,
  updateActiveUserApi: `${KEY_API}/user/activate/toggle/{id}`,
  getDevicesUserApi: `${KEY_API}/user/devices/{id}`,
  revokeRoleUserApi: `${KEY_API}/user/revoke-role/{id}`,
  assignRoleUserApi: `${KEY_API}/user/assign-role/{id}`,
  getListPropertiesBuildingApi: `${KEY_API}/building/properties/list`,
  deletePropertiesBuildingApi: `${KEY_API}/building/properties/delete/{id}`,
  deletePropertiesBuildingValueApi: `${KEY_API}/building/properties/values/delete/{property_id}/{value_id}`,
  getListAllBuildingApi: `${KEY_API}/building/list`,
  getListOwnBuildingApi: `${KEY_API}/building/own/list`,
  addPropertiesBuildingValueApi: `${KEY_API}/building/properties/create`,
  addValuePropertiesBuildingValueApi: `${KEY_API}/building/properties/values/add/{id}`,
  createBuildingApi: `${KEY_API}/building/create`,
  getBuildingWithIdApi: `${KEY_API}/building/{id}`,
  similarToAnotherBuildingApi: `${KEY_API}/building/set-similarity/{id}`,
  setStateBuildingApi: `${KEY_API}/building/{id}/set-state`,
  setNextReviewBuildingApi: `${KEY_API}/building/set-next-review/{id}`,
  getPropertiesApi: `${KEY_API}/building/properties/list`,
  getPersonsReceiverShareApi: `${KEY_API}/share/recivers`,
  getPersonsSenderShareApi: `${KEY_API}/share/senders`,
  getRelatedPersonApi: `${KEY_API}/building/relation/list`,
  getPersonsRelatedBuildingApi: `${KEY_API}/building/relation/list`,
  searchUserApi: `${KEY_API}/user/search`,
  updateSetStatusBuildingApi: `${KEY_API}/building/{id}/set-status`,
  updateChangeForceBuildingApi: `${KEY_API}/building/{building_id}/reviews/{review_id}/change-force`,
  updateChangeDoneBuildingApi: `${KEY_API}/building/{building_id}/reviews/{review_id}/change-done`,
  reviewBuildingApi: `${KEY_API}/building/{id}/review/create`
};

// loop to all permissions of roles user
export const checkPermissionForCallApi: TCheckPermissionForCall = (
  permissionsUser,
  keys
) => {
  if (Array.isArray(keys)) {
    let lengthPermission = keys.length;
    let checked: string[] = [];
    permissionsUser.forEach(({ permissions }) =>
      permissions.forEach(({ name }) =>
        keys.forEach((key) => {
          if (permissionApis[key] === name && !checked.includes(name)) {
            checked.push(name);
            lengthPermission -= 1;
            return true;
          }
        })
      )
    );
    return lengthPermission === 0;
  } else {
    return permissionsUser.some(({ permissions }) =>
      permissions.some(({ name }) => permissionApis[keys] === name)
    );
  }
};
