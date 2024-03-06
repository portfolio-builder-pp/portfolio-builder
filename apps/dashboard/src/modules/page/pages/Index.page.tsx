import { useNavigate } from 'react-router-dom';
import { PagesTable } from '../tables/Page.table';
import Button from '@mui/material/Button';

export function PageIndexPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate('create')}>Create Page</Button>
      <PagesTable />
    </>
  );
}
