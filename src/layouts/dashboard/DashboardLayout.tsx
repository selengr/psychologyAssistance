"use client"
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
import { NavVertical } from './nav/NavVertical';

// components

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <>
      <NavVertical />
      {children}
    </>
  );
}
