import { UserRole } from '@portfolio-builder/shared-types';
import { UserForm } from '../forms/User.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate } from 'react-router-dom';

export function UserCreatePage() {
  const navigate = useNavigate();
  const { mutateAsync } = trpc.auth.register.useMutation({
    onSuccess() {
      navigate('/dashboard/user');
    },
  });
  return (
    <UserForm
      defaultValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: UserRole.Moderator,
      }}
      onSubmit={async (values) => await mutateAsync(values)}
    />
  );
}
