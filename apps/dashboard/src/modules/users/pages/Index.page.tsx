import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@portfolio-builder/shared-types';
import { AuthGuard } from '../../auth/auth-guard';
import { UsersTable } from '../tables/Users.table';

export function UserIndexPage() {
  const navigate = useNavigate();
  return (
    <AuthGuard roles={roles}>
      <Button onClick={() => navigate('create')}>Create a User</Button>
      <UsersTable />
    </AuthGuard>
  );
}

const roles = [UserRole.Admin];
