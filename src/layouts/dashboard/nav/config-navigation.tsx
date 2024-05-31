// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/svg/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  home: icon('ic_dsh_home'),
  group: icon('ic_dsh_group'),
  participants: icon('ic_dsh_participants'),
  assessments: icon('ic_dsh_my_assessments'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'خانه', path: PATH_DASHBOARD.root, icon: ICONS.home },
      { title: 'ارزیابی‌های من', path: PATH_DASHBOARD.root, icon: ICONS.assessments },
      { title: 'شرکت‌کننده‌ها', path: PATH_DASHBOARD.root, icon: ICONS.participants },
      { title: 'گروه‌ها', path: PATH_DASHBOARD.root, icon: ICONS.group },
    ],
  },

  // ----------------------------------------------------------------------

];

export default navConfig;
