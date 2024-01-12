import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { trpc } from '../../../shared/trpc-query';
import { BlogPostDto, BlogPostStatus } from '@portfolio-builder/shared-types';
import { Chip } from '@mui/material';

export const BlogPostsTable = () => {
  const blogPosts = trpc.blogPost.findAll.useQuery();
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

const columns: GridColDef<BlogPostDto>[] = [
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
