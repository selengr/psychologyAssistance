export const EnumStateBuilding: { [key: string]: string } = {
  complete: 'اجرا شده', running: 'در حال پیگیری', failed: 'از دست رفته', unknown: 'نامشخص'
};
export const getStateBuilding = (name: string) =>
  !!EnumStateBuilding[name] ? EnumStateBuilding[name] : name;

const EnumStateBuildingColor: { [key: string]: string } = {
  complete: 'success', running: 'warning', failed: 'error', unknown: 'action'
};

export const getStateBuildingColor = (name: string):string  =>
  !!EnumStateBuildingColor[name] ? EnumStateBuildingBadgeMap[name] : 'action';


const EnumStateBuildingBadgeMap: { [key: string]: string } = {
  complete: '#08564b',running: '#16e8cb', unknown: '#ffa726', failed: '#f44336',
};

export const getStateBuildingBadgeMap = (name: string):string  =>
  !!EnumStateBuildingBadgeMap[name] ? EnumStateBuildingBadgeMap[name] : '#ffa726';
