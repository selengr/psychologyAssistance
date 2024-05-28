// 'use client';

// import { useEffect } from 'react';
// import {
//   ReadonlyURLSearchParams,
//   useRouter,
//   useSearchParams
// } from 'next/navigation';

// import { GetToken } from '@/auth/getToken';
// import { LOCALHOST } from '@/config-global';
// import { PATH_AUTH } from '@/routes/paths';

// const AuthVerify = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const searchParams:
//     | string
//     | string[][]
//     | Record<string, string>
//     | URLSearchParams
//     | undefined
//     | any = useSearchParams();
//   const params = new URLSearchParams(searchParams);

//   const Verify = () => {
//     if (process.env.NODE_ENV !== 'production') {
//       //==================
//     }
//     (async () => {
//       const code = searchParams?.get('code') + '';
//       const accessToken = localStorage.getItem('access_token') + '';

//       if (code.length > 10 && accessToken.length < 10) {
//         await GetToken(code, LOCALHOST);
//         // return router.push('/');
//       } else if (accessToken.length < 10) {
//         return router.push(PATH_AUTH.login);
//         // redirect(PATH_AUTH.login);
//       }
//       if (params.has('code') && accessToken.length > 10) {
//         params.delete('code');
//       }
//     })();
//   };

//   useEffect(() => {
//     Verify();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return <>{children}</>;
// };

// export default AuthVerify;
const page = () => {
  return (
    <div>
      Enter
    </div>
  );
}

export default page;