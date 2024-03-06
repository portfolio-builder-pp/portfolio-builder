import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { ContactDetailsDto } from '@portfolio-builder/shared-types';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { trpc } from '../../../shared/trpc-query';
import { useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export const ContactsTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<string>('');

  const { mutateAsync } = trpc.contactDetails.remove.useMutation();

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
  const contactDetails = trpc.contactDetails.findAll.useQuery();
  const columns = useMemo(
    () => getColumns({ navigate, handleOpen }),
    [navigate]
  );

  return (
    <>
      <DataGrid
        loading={contactDetails.isLoading}
        rows={contactDetails.data || []}
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
}): GridColDef<ContactDetailsDto>[] => [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone number',
    width: 200,
  },
  {
    field: 'contactEmail',
    headerName: 'Contact email',
    width: 300,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'boolean',
    valueGetter: ({ row: { address } }) =>
      address && Object.values(address).some(Boolean),
  },
  {
    field: 'socialMediaLinks',
    headerName: 'Social media links',
    type: 'boolean',
    valueGetter: ({ row: { socialMediaLinks } }) =>
      socialMediaLinks && Object.values(socialMediaLinks).some(Boolean),
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
