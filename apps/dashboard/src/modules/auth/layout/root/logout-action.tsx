import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { trpc } from '../../../../shared/trpc-query';

export const LogoutAction = () => {
  const utils = trpc.useUtils();
  const { mutate } = trpc.auth.logout.useMutation({
    async onSuccess() {
      await utils.auth.userInfo.invalidate();
    },
  });
  return (
    <IconButton color="inherit" onClick={() => mutate()}>
      <LogoutIcon />
    </IconButton>
  );
};
