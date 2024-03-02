import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridActionsCellItem,
  GridDeleteIcon,
} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { trpc } from '../../../shared/trpc-query';
import { PageDto, PageType } from '@portfolio-builder/shared-types';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

export const PagesTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<string>('');

  const { mutateAsync } = trpc.page.remove.useMutation();

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
  const pages = trpc.page.findAll.useQuery();
  const columns = useMemo(
    () => getColumns({ navigate, handleOpen }),
    [navigate]
  );
  return (
    <>
      <DataGrid
        loading={pages.isLoading}
        rows={pages.data || []}
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
  navigate,
  handleOpen,
}: {
  navigate: NavigateFunction;
  handleOpen: (id: string) => void;
}): GridColDef<PageDto>[] => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'slug',
    headerName: 'Address',
  },
  {
    field: 'enabled',
    headerName: 'Enabled',
    type: 'boolean',
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 150,
    renderCell(params: GridRenderCellParams<PageDto, PageType>) {
      return <Chip label={typeNames[params.row.type]} color="success" />;
    },
  },
  {
    field: 'seoTitle',
    headerName: 'SEO Title',
  },
  {
    field: 'seoDescription',
    headerName: 'SEO Description',
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

export const typeNames: Record<PageType, string> = {
  [PageType.Contact]: 'Contact',
  [PageType.Home]: 'Home',
  [PageType.Portfolio]: 'Portfolio',
  [PageType.Blog]: 'Blog',
  [PageType.Custom]: 'Custom',
};
