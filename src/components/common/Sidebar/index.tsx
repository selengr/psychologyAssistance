import { memo } from 'react';
import { Menus } from '../Container/menuItems';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ScreenSize } from '@/utils/utils';
import { StyledMenu } from '@/layouts/dashboard/nav/Menu';

interface Props {
  activeMenu?: any;
  isActive?: any;
  role?: 'agent' | 'user' | 'scope' | 'admin';
  roleType?: number;
}

export const Sidebar = ({ role, roleType }: Props) => {
  // const screenSize = ScreenSize();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const path = location.pathname;
  const navigate = '';
  const location = '';
  const path = '';

  const MenuComponent = (props: any) => {
    return (
      <StyledMenu
        key={props.key}
        className={'mobile'}
        iconOver={props.item.iconOver}
        icon={props.item.icon}
        value={props.item.primaryName}
        badge={props.item.badge}
        id={(props.key + 1).toString()}
        // active={location.pathname.includes(props.item.path)}
        active={true}
        onClick={() => {
          // navigate(props.item.path);
          console.log('object');
        }}
      />
    );
  };
  return (
    <>
      {(roleType === 2 || roleType === 1 || roleType === 0) &&
        role === 'agent' &&
        !path.includes('/admin') &&
        Menus().agent.map((item, index) => <MenuComponent key={index} item={item} />)}
      {roleType === 2 &&
        role === 'agent' &&
        path.includes('/admin') &&
        Menus().admin.map((item: any, index: any) => <MenuComponent key={index} item={item} />)}
      {role === 'scope' &&
        Menus().scope.map((item, index) => <MenuComponent key={index} item={item} />)}
      {role === 'user' &&
        Menus().user.map((item, index) => <MenuComponent key={index} item={item} />)}
    </>
  );
};
