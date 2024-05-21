const EnumRoles: { [key: string]: string } = {
  'super admin': 'سوپر ادمین',
  admin: 'ادمین',
  contractor: 'پیمانکار',
  reporter: 'گزارشگر',
};
export const getNameRole = (name: string) =>
  !!EnumRoles[name] ? EnumRoles[name] : name;
