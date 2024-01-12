import { ContactForm, FieldValues } from '../forms/Contact.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateContactDetailsDto } from '@portfolio-builder/shared-types';

export function ContactUpdatePage() {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  if (!id) return null;

  const { data, status } = trpc.contactDetails.findById.useQuery(
    { id: id },
    { enabled: !!id }
  );

  const { mutateAsync } = trpc.contactDetails.update.useMutation({
    onSuccess() {
      navigate('/dashboard/contact');
    },
  });

  if (status === 'loading') return null;
  if (status === 'error' || !data) return <div>błąd pobierania</div>;

  const defaultValues: FieldValues = {
    title: data.title,
    phoneNumber: data.phoneNumber,
    contactEmail: data.contactEmail,
    order: data.order,
    socialMediaLinks: {
      instagram: data.socialMediaLinks?.instagram ?? '',
      twitter: data.socialMediaLinks?.twitter ?? '',
      facebook: data.socialMediaLinks?.facebook ?? '',
      youtube: data.socialMediaLinks?.youtube ?? '',
      tiktok: data.socialMediaLinks?.tiktok ?? '',
      onlyfans: data.socialMediaLinks?.onlyfans ?? '',
    },
    address: {
      country: data.address?.country ?? '',
      state: data.address?.state ?? '',
      city: data.address?.city ?? '',
      streetName: data.address?.streetName ?? '',
      streetNumber: data.address?.streetNumber ?? '',
      postCode: data.address?.postCode ?? '',
    },
  };

  return (
    <ContactForm
      defaultValues={defaultValues}
      onSubmit={async (values) => {
        const payload: UpdateContactDetailsDto = {
          id,
          details: {
            ...values,
          },
        };
        await mutateAsync(payload);
      }}
    />
  );
}
