const EnumCategoryPermission: { [key: string]: string } = {
  user: 'کاربر',
  manage: 'مدیریت',
  building: 'ساختمان',
  reporter: 'گزارشگر',
  devices: 'دستگاه',
  share: 'اشتراک گذاری',
  'un-share': 'برداشتن اشتراک گذاری',
};
export const getNameCategoryPermission = (name: string) =>
  !!EnumCategoryPermission[name] ? EnumCategoryPermission[name] : name;
