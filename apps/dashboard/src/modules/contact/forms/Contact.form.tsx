import { zodResolver } from '@hookform/resolvers/zod';
import { createContactDetailsSchema } from '@portfolio-builder/shared-validation';
import {
  FormContainer,
  SubmitHandler,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';
import { Button } from '@mui/material';

export type ContactForm = {
  defaultValues?: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
};
export const ContactForm = (props: ContactForm) => {
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
        name="phoneNumber"
        label="Phone number"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="contactEmail"
        label="Contact email"
        type="email"
        fullWidth
      />
      <h1>Address</h1>
      <TextFieldElement
        margin="normal"
        name="address.country"
        label="Country"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="address.state"
        label="State"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="address.postCode"
        label="Post code"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="address.city"
        label="City"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="address.streetName"
        label="Street name"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="address.streetNumber"
        label="Street number"
        fullWidth
      />
      <h1>Social media links</h1>
      <TextFieldElement
        margin="normal"
        name="socialMediaLinks.instagram"
        label="Instagram"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="socialMediaLinks.twitter"
        label="Twitter"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="socialMediaLinks.facebook"
        label="Facebook"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="socialMediaLinks.youtube"
        label="Youtube"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="socialMediaLinks.tiktok"
        label="Tiktok"
        fullWidth
      />
      <TextFieldElement
        margin="normal"
        name="socialMediaLinks.onlyfans"
        label="Onlyfans"
        fullWidth
      />
    </FormContainer>
  );
};

const schema = createContactDetailsSchema;
export type FieldValues = z.infer<typeof schema>;
