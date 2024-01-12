import { ContactForm } from '../forms/Contact.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate } from 'react-router-dom';

export function ContactCreatePage() {
  const navigate = useNavigate();
  const { mutateAsync } = trpc.contactDetails.create.useMutation({
    onSuccess() {
      navigate('/dashboard/contact');
    },
  });
  return (
    <ContactForm
      defaultValues={{
        title: '',
        phoneNumber: '',
        contactEmail: '',
        order: 0,
        socialMediaLinks: {
          instagram: '',
          twitter: '',
          facebook: '',
          youtube: '',
          tiktok: '',
          onlyfans: '',
        },
        address: {
          country: '',
          state: '',
          city: '',
          streetName: '',
          streetNumber: '',
          postCode: '',
        },
      }}
      onSubmit={async (values) => await mutateAsync(values)}
    />
  );
}
