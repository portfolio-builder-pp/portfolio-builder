import { zodResolver } from '@hookform/resolvers/zod';
import { createBlogPostSchema } from '@portfolio-builder/shared-validation';
import {
  Controller,
  FormContainer,
  SelectElement,
  SubmitHandler,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';
import ReactQuill from 'react-quill';
import { Button, FormHelperText } from '@mui/material';
import { BlogPostStatus } from '@portfolio-builder/shared-types';
import { statusNames } from '../tables/BlogPosts.table';

export type BlogPostForm = {
  defaultValues?: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
};
export const BlogPostForm = (props: BlogPostForm) => {
  return (
    <FormContainer<FieldValues>
      defaultValues={props.defaultValues}
      onSuccess={props.onSubmit}
      resolver={zodResolver(schema)}
    >
      <Button type="submit">Submit</Button>
      <TextFieldElement margin="normal" name="title" label="Title" fullWidth />
      <TextFieldElement
        margin="normal"
        name="description"
        label="Description"
        fullWidth
        multiline
        minRows={5}
      />
      <SelectElement
        margin="normal"
        name="status"
        label="Status"
        fullWidth
        options={statusOptions}
      />
      <Controller
        name="content"
        render={({ field, fieldState, formState }) => {
          return (
            <>
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'image'],

                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }],

                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],

                    ['clean'],
                  ],
                }}
              />
              <FormHelperText />
            </>
          );
        }}
      />
    </FormContainer>
  );
};

const schema = createBlogPostSchema;
export type FieldValues = z.infer<typeof schema>;

const statusOptions = [
  BlogPostStatus.Draft,
  BlogPostStatus.Archived,
  BlogPostStatus.Published,
].map((status) => ({
  id: status,
  label: statusNames[status],
}));
