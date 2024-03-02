import { zodResolver } from '@hookform/resolvers/zod';
import { createPageSchema } from '@portfolio-builder/shared-validation';
import {
  CheckboxElement,
  FormContainer,
  SelectElement,
  SubmitHandler,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';
import { Button } from '@mui/material';
import { PageType } from '@portfolio-builder/shared-types';
import { typeNames } from '../tables/Page.table';

export type PageForm = {
  defaultValues?: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
};
export const PageForm = (props: PageForm) => {
  return (
    <FormContainer<FieldValues>
      defaultValues={props.defaultValues}
      onSuccess={props.onSubmit}
      resolver={zodResolver(schema)}
    >
      <Button type="submit">Submit</Button>
      <TextFieldElement margin="normal" name="name" label="Name" fullWidth />
      <TextFieldElement margin="normal" name="slug" label="Address" fullWidth />
      <CheckboxElement name="enabled" label="Enabled" />
      <SelectElement
        margin="normal"
        name="type"
        label="Type"
        fullWidth
        options={statusOptions}
      />
      <TextFieldElement
        margin="normal"
        name="seoTitle"
        label="SEO Title"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="seoDescription"
        label="SEO Description"
        fullWidth
      />
    </FormContainer>
  );
};

const schema = createPageSchema;
export type FieldValues = z.infer<typeof schema>;

const statusOptions = [
  PageType.Contact,
  PageType.Home,
  PageType.Portfolio,
  PageType.Blog,
  PageType.Custom,
].map((status) => ({
  id: status,
  label: typeNames[status],
}));
