// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/svg/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  home: icon('ic_dsh_home'),
  groups: icon('ic_dsh_group'),
  participants: icon('ic_dsh_participants'),
  assessments: icon('ic_dsh_my_assessments'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'خانه', path: PATH_PAGE.root, icon: ICONS.home },
      { title: 'ارزیابی‌های من', path: PATH_PAGE.assessments.root, icon: ICONS.assessments },
      { title: 'شرکت‌کننده‌ها', path: PATH_PAGE.participants.root, icon: ICONS.participants },
      { title: 'گروه‌ها', path: PATH_PAGE.groups.root, icon: ICONS.groups },
    ],
  },

  // ----------------------------------------------------------------------

];

export default navConfig;
