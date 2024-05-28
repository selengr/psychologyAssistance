// import { useState } from 'react';
// // import { Icons, MobileDrawer, WebDrawer } from 'components';
// import { Grid, IconButton } from '@mui/material';
// import useResponsive from '@/hooks/useResponsive';
// import { StyledMobileDrawer, StyledWebDrawer } from './Drawer';

// export function ContainerPage(Props) {
//   const isDesktop = useResponsive('up', 'lg');

//   const [visible, setVisible] = useState(false);
//   const showDrawer = () => {
//     setVisible(true);
//   };
//   const onClose = () => {
//     setVisible(false);
//   };
//   return (
//     <>
//       {!isDesktop ? (
//         <>
//           {Props.role === 'agent' && (
//             <>
//               <IconButton className={'icon'} onClick={showDrawer} sx={{ mr: '15px', mt: '15px', mb: '-10px' }}>
//                 <Icons name='Burger-Menu' size={'web'} />
//               </IconButton>
//               <StyledMobileDrawer scopeName={Props.userName} role={Props.role} roleData={Props.roleData} roleId={Props.roleId} roleType={Props.roleType} onClose={onClose} open={visible} />
//             </>
//           )}
//         </>
//       ) : (
//         <Grid container>
//           <Grid item>
//             <StyledWebDrawer scopeName={Props.userName} role={Props.role} roleData={Props.roleData} roleId={Props.roleId} roleType={Props.roleType} open />
//           </Grid>
//         </Grid>
//       )}
//     </>
//   );
// }
