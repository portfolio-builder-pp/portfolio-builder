import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
  GridActionsCellItem,
  GridDeleteIcon,
} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { trpc } from '../../../shared/trpc-query';
import { BlogPostDto, BlogPostStatus } from '@portfolio-builder/shared-types';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

export const BlogPostsTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<string>('');

  const { mutateAsync } = trpc.blogPost.remove.useMutation();

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
  const blogPosts = trpc.blogPost.findAll.useQuery();
  const columns = useMemo(
    () => getColumns({ navigate, handleOpen }),
    [navigate]
  );
  return (
    <>
      <DataGrid
        loading={blogPosts.isLoading}
        rows={blogPosts.data || []}
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

const dateValueGetter = ({
  value,
}: GridValueGetterParams<BlogPostDto, string>) => value && new Date(value);

const getColumns = ({
  navigate,
  handleOpen,
}: {
  navigate: NavigateFunction;
  handleOpen: (id: string) => void;
}): GridColDef<BlogPostDto>[] => [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 200,
    valueGetter: ({ row: { author } }) =>
      `${author.firstName} ${author.lastName}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell(params: GridRenderCellParams<BlogPostDto, BlogPostStatus>) {
      return (
        <Chip
          label={statusNames[params.row.status]}
          color={statusColors[params.row.status]}
        />
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    type: 'date',
    width: 150,
    valueGetter: dateValueGetter,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    type: 'date',
    width: 150,
    valueGetter: dateValueGetter,
  },
  {
    field: 'publishedAt',
    headerName: 'Published',
    type: 'date',
    width: 150,
    valueGetter: dateValueGetter,
  },
  {
    field: 'actions',
    type: 'actions',
    getActions(params) {
      return [
        <GridActionsCellItem
          label="Edit"
          icon={<EditIcon />}
          showInMenu
          onClick={() => navigate(`${params.row.id}/update`)}
        />,
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

export const statusNames: Record<BlogPostStatus, string> = {
  [BlogPostStatus.Draft]: 'Draft',
  [BlogPostStatus.Archived]: 'Archived',
  [BlogPostStatus.Published]: 'Published',
};

const statusColors = {
  [BlogPostStatus.Draft]: 'warning',
  [BlogPostStatus.Archived]: 'error',
  [BlogPostStatus.Published]: 'success',
} as const;
