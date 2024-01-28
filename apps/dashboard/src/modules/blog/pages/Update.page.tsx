import { BlogPostForm, FieldValues } from '../forms/BlogPost.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateBlogPostDto } from '@portfolio-builder/shared-types';

export function BlogUpdatePage() {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  if (!id) return null;

  const { data, status } = trpc.blogPost.findById.useQuery(
    { id: id },
    { enabled: !!id }
  );

  const { mutateAsync } = trpc.blogPost.update.useMutation({
    onSuccess() {
      navigate('/dashboard/blog');
    },
  });

  if (status === 'loading') return null;
  if (status === 'error' || !data) return <div>Error while loading data</div>;

  const defaultValues: FieldValues = {
    content: data.content,
    description: data.description,
    order: data.order,
    status: data.status,
    title: data.title,
  };

  return (
    <BlogPostForm
      defaultValues={defaultValues}
      onSubmit={async (values) => {
        const payload: UpdateBlogPostDto = {
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
