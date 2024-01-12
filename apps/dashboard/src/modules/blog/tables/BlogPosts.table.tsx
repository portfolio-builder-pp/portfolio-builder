import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { trpc } from '../../../shared/trpc-query';
import { BlogPostDto, BlogPostStatus } from '@portfolio-builder/shared-types';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const BlogPostsTable = () => {
  const navigate = useNavigate();
  const blogPosts = trpc.blogPost.findAll.useQuery();
  const columns = useMemo(() => getColumns({ navigate }), [navigate]);
  return (
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
  );
};

const dateValueGetter = ({
  value,
}: GridValueGetterParams<BlogPostDto, string>) => value && new Date(value);

const getColumns = ({
  navigate,
}: {
  navigate: NavigateFunction;
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
