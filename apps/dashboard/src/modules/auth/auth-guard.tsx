import { PropsWithChildren } from 'react';
import { trpc } from '../../shared/trpc-query';
import { Navigate } from 'react-router-dom';

export type AuthGuard = PropsWithChildren;
export const AuthGuard = (props: AuthGuard) => {
  const userInfo = trpc.auth.userInfo.useQuery();

  if (userInfo.status === 'loading') return null;
  if (userInfo.status === 'error') return <Navigate to="/login" />;
  return props.children;
};
