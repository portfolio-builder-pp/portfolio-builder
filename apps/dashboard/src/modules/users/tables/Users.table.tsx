import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { trpc } from '../../../shared/trpc-query';
import { UserDto, UserRole } from '@portfolio-builder/shared-types';
import { Chip } from '@mui/material';

export const UsersTable = () => {
  const users = trpc.users.findAll.useQuery<UserDto[]>();
  return (
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
  );
};

const columns: GridColDef<UserDto>[] = [
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
];

export const roleNames: Record<UserRole, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Moderator]: 'Moderator',
};

const roleColors = {
  [UserRole.Admin]: 'error',
  [UserRole.Moderator]: 'warning',
} as const;
