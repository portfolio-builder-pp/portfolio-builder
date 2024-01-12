import { UserRole } from '@portfolio-builder/shared-types';
import { AuthGuard } from '../../auth/auth-guard';
import { UsersTable } from '../tables/Users.table';

export function UserIndexPage() {
  return (
    <AuthGuard roles={roles}>
      <UsersTable />
    </AuthGuard>
  );
}

const roles = [UserRole.Admin];
