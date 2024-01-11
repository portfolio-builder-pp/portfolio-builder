import { Box, Button, Container, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormContainer,
  SubmitHandler,
  TextFieldElement,
} from 'react-hook-form-mui';
import { trpc } from '../../shared/trpc-query';
import { Navigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FieldValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const userInfo = trpc.auth.userInfo.useQuery();
  const utils = trpc.useUtils();
  const { mutate } = trpc.auth.login.useMutation({
    async onSuccess() {
      await utils.auth.userInfo.invalidate();
    },
  });

  if (userInfo.status === 'loading') return null;
  if (userInfo.status === 'success') return <Navigate to="/dashboard" />;

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    mutate(values);
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <FormContainer<FieldValues>
          resolver={zodResolver(schema)}
          onSuccess={onSubmit}
          defaultValues={{ email: '', password: '' }}
        >
          <TextFieldElement
            margin="normal"
            variant="standard"
            name="email"
            label="Adres e-mail"
            type="email"
            required
            fullWidth
          />
          <TextFieldElement
            margin="normal"
            name="password"
            variant="standard"
            label="Hasło"
            type="password"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
        </FormContainer>
      </Box>
    </Container>
  );
};
