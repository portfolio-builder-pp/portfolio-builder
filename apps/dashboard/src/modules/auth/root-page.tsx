import { Outlet } from 'react-router-dom';
import { AuthGuard } from './auth-guard';
import RootLayout from './layout/root/root-layout';
import { UserRole } from '@portfolio-builder/shared-types';

export const RootPage = () => {
  return (
    <AuthGuard roles={roles}>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </AuthGuard>
  );
};

const roles = [UserRole.Admin, UserRole.Moderator];
