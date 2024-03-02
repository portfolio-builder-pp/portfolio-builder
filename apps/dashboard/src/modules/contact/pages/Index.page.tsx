import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ContactsTable } from '../tables/Contact.table';

export function ContactIndexPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate('create')}>
        Create Contact Details Item
      </Button>
      <ContactsTable />
    </>
  );
}
