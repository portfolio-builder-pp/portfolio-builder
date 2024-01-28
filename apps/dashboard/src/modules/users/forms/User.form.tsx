import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@portfolio-builder/shared-validation';
import { UserRole } from '@portfolio-builder/shared-types';
import {
  FormContainer,
  SelectElement,
  SubmitHandler,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';
import { Button } from '@mui/material';
import { roleNames } from '../tables/Users.table';

export type UserForm = {
  defaultValues?: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
};
export const UserForm = (props: UserForm) => {
  return (
    <FormContainer<FieldValues>
      defaultValues={props.defaultValues}
      onSuccess={props.onSubmit}
      resolver={zodResolver(schema)}
    >
      <Button type="submit">Submit</Button>
      <TextFieldElement
        margin="normal"
        name="email"
        label="Email"
        type="email"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="firstName"
        label="First name"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="lastName"
        label="Last name"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="password"
        label="Password"
        type="password"
        fullWidth
      />
      <SelectElement
        margin="normal"
        name="role"
        label="Role"
        fullWidth
        options={roleOptions}
      />
    </FormContainer>
  );
};

const schema = registerSchema;
export type FieldValues = z.infer<typeof schema>;

const roleOptions = [UserRole.Admin, UserRole.Moderator].map((role) => ({
  id: role,
  label: roleNames[role],
}));
