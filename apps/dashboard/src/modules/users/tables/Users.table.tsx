import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { trpc } from '../../../shared/trpc-query';
import { UserDto, UserRole } from '@portfolio-builder/shared-types';
import { Chip } from '@mui/material';
import { useMemo, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const UsersTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<string>('');

  const { mutateAsync } = trpc.users.remove.useMutation();

  const handleOpen = (id: string) => {
    setModalId(id);
    setModalOpen(true);
  };

  const handleClose = (accept: boolean) => {
    if (accept && modalId) {
      mutateAsync({
        id: modalId,
      });
    }

    setModalOpen(false);
    setModalId('');
  };

  const navigate = useNavigate();
  const users = trpc.users.findAll.useQuery<UserDto[]>();
  const columns = useMemo(
    () => getColumns({ _navigate: navigate, handleOpen }),
    [navigate]
  );

  return (
    <>
      <DataGrid
        loading={users.isLoading}
        rows={users.data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure that you want to delete this item?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const getColumns = ({
  _navigate,
  handleOpen,
}: {
  _navigate: NavigateFunction;
  handleOpen: (id: string) => void;
}): GridColDef<UserDto>[] => [
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    renderCell(params: GridRenderCellParams<UserDto, UserRole>) {
      return (
        <Chip
          label={roleNames[params.row.role]}
          color={roleColors[params.row.role]}
        />
      );
    },
  },
  {
    field: 'actions',
    type: 'actions',
    getActions(params) {
      return [
        <GridActionsCellItem
          label="Delete"
          icon={<GridDeleteIcon />}
          showInMenu
          onClick={() => handleOpen(params.row.id)}
        />,
      ];
    },
  },
];

export const roleNames: Record<UserRole, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Moderator]: 'Moderator',
};

const roleColors = {
  [UserRole.Admin]: 'error',
  [UserRole.Moderator]: 'warning',
} as const;
