import { fetchApi } from '../config/configAxios';

interface PermissionListApi {
  data: any[];
}
export function permissionListApi() {
  return fetchApi.get<PermissionListApi>('/manage/permission/list');
}

interface RoleListApi {
  data: any[];
}
export function roleListApi() {
  return fetchApi.get<RoleListApi>('/manage/role/list');
}

export function assignPermissionToRoleApi(data: {
  role_name: string;
  permissions: string[];
}) {
  return fetchApi.post<RoleListApi>('/manage/role/permissions/assign', data);
}

export function revokePermissionToRoleApi(data: {
  role_name: string;
  permissions: string[];
}) {
  return fetchApi.post<RoleListApi>('/manage/role/permissions/revoke', data);
}

export function addRoleApi(data: { name: string }) {
  return fetchApi.post('/manage/role/create', data);
}
