import { PageForm, FieldValues } from '../forms/Page.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdatePageDto } from '@portfolio-builder/shared-types';

export function PageUpdatePage() {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  if (!id) return null;

  const { data, status } = trpc.page.findById.useQuery(
    { id: id },
    { enabled: !!id }
  );

  const { mutateAsync } = trpc.page.update.useMutation({
    onSuccess() {
      navigate('/dashboard/page');
    },
  });

  if (status === 'loading') return null;
  if (status === 'error' || !data) return <div>Error while loading data</div>;

  const defaultValues: FieldValues = {
    name: data.name,
    slug: data.slug,
    order: data.order,
    enabled: data.enabled,
    type: data.type,
    sections: data.sections,
    properties: data.properties,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
  };

  return (
    <PageForm
      defaultValues={defaultValues}
      onSubmit={async (values) => {
        const payload: UpdatePageDto = {
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
