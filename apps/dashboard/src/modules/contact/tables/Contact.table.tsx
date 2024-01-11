import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ContactDetailsDto } from '@portfolio-builder/shared-types';
import { trpc } from '../../../shared/trpc-query';

export const ContactsTable = () => {
  const contactDetails = trpc.contactDetails.findAll.useQuery();
  return (
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
  );
};

const columns: GridColDef<ContactDetailsDto>[] = [
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
      address && Object.values(address).length > 0,
  },
  {
    field: 'socialMediaLinks',
    headerName: 'Social media links',
    type: 'boolean',
    valueGetter: ({ row: { socialMediaLinks } }) =>
      socialMediaLinks && Object.values(socialMediaLinks).length > 0,
  },
];
