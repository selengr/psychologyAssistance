import { usePathname, useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();
  // const checkPath = path.includes('#');

  const currentPath = path === '/' ? '/' : `${path}`;

  // const normalActive =  (!checkPath && pathname === currentPath) || (!checkPath && pathname === currentPath);
  const normalActive =  ( pathname === currentPath) || (pathname === currentPath);

  const deepActive = 
    // (!checkPath && pathname.includes(currentPath)) || (!checkPath && pathname.includes(currentPath));
    (pathname.includes(currentPath)) || (pathname.includes(currentPath));
    
    return {
    active: deep ? deepActive : normalActive,
    // isExternalLink: path.includes('http') ?? false,
    isExternalLink: false,
  };
}
