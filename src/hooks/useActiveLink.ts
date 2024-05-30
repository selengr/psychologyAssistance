import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  // const { pathname, asPath } = useRouter();

  // const checkPath = path?.startsWith('#');

  // const currentPath = path === '/' ? '/' : `${path}/`;

  const normalActive = true
    // (!checkPath && pathname === currentPath) || (!checkPath && asPath === currentPath);

  const deepActive = true
    // (!checkPath && pathname.includes(currentPath)) || (!checkPath && asPath.includes(currentPath));

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: false,
  };
}
