import { BlogPostStatus } from '@portfolio-builder/shared-types';
import { BlogPostForm } from '../forms/BlogPost.form';
import { trpc } from '../../../shared/trpc-query';
import { useNavigate } from 'react-router-dom';

export function BlogCreatePage() {
  const navigate = useNavigate();
  const { mutateAsync } = trpc.blogPost.create.useMutation({
    onSuccess() {
      navigate('/dashboard/blog');
    },
  });
  return (
    <BlogPostForm
      defaultValues={{
        content: '',
        description: '',
        order: 0,
        status: BlogPostStatus.Draft,
        title: '',
      }}
      onSubmit={async (values) => await mutateAsync(values)}
    />
  );
}
