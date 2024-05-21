// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  blank: path(ROOTS_DASHBOARD, '/blank'),
 
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  },

 
};
