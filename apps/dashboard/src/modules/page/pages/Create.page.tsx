import { PageType } from '@portfolio-builder/shared-types';
import { PageForm } from '../forms/Page.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate } from 'react-router-dom';

export function PageCreatePage() {
  const navigate = useNavigate();
  const { mutateAsync } = trpc.page.create.useMutation({
    onSuccess() {
      navigate('/dashboard/page');
    },
  });
  return (
    <PageForm
      defaultValues={{
        name: '',
        slug: '',
        order: 0,
        enabled: true,
        type: PageType.Custom,
        sections: [],
        properties: [],
        seoTitle: '',
        seoDescription: '',
      }}
      onSubmit={async (values) => await mutateAsync(values)}
    />
  );
}
