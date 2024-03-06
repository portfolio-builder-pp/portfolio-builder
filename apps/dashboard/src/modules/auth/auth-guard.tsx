import { PropsWithChildren } from 'react';
import { trpc } from '../../shared/trpc-query';
import { Navigate } from 'react-router-dom';
import { UserDto, UserRole } from '@portfolio-builder/shared-types';

export type AuthGuard = PropsWithChildren<{
  roles?: UserRole[];
}>;
export const AuthGuard = (props: AuthGuard) => {
  const userInfo = trpc.auth.userInfo.useQuery();

  if (userInfo.status === 'loading') return null;
  if (userInfo.status === 'error') return <Navigate to="/login" />;

  if (!props.roles) return props.children;

  const userInfoData = userInfo.data as unknown as UserDto;

  if (!props.roles.includes(userInfoData.role))
    return <Navigate to="/dashboard" />;

  return props.children;
};
