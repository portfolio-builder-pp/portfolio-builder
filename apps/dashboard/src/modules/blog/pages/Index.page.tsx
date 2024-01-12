import { useNavigate } from 'react-router-dom';
import { BlogPostsTable } from '../tables/BlogPosts.table';
import Button from '@mui/material/Button';

export function BlogIndexPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate('create')}>Create Blog Post</Button>
      <BlogPostsTable />
    </>
  );
}
