import { Outlet } from 'react-router-dom';
import { AuthGuard } from './auth-guard';
import RootLayout from './layout/root/root-layout';

export const RootPage = () => {
  return (
    <AuthGuard>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </AuthGuard>
  );
};
