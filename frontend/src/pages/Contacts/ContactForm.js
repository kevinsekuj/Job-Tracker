import PropTypes from "prop-types";

import { Button, Grid, TextField, Typography } from "@mui/material";

import { Field, Form } from "formik";

export default function ContactForm({ heading, values, isSubmitting }) {
  return (
    <Form>
      <Typography variant="h4" my={2}>
        {heading}
      </Typography>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Field
            label="First Name"
            name="firstName"
            type="input"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <Field
            label="Last Name"
            name="lastName"
            type="input"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <Field
            label="Email"
            name="email"
            type="email"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <Field
            label="Phone Number"
            name="phoneNumber"
            type="input"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <Button fullWidth type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Debugging purposes only. */}
      {process.env.NODE_ENV !== "production" && (
        <pre>{JSON.stringify(values, null, 2)}</pre>
      )}
    </Form>
  );
}

ContactForm.propTypes = {
  heading: PropTypes.string.isRequired,

  values: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,

  isSubmitting: PropTypes.bool.isRequired,
};
