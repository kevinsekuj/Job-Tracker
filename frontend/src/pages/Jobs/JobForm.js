import { Button, Grid, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Field, Form } from "formik";

const JobForm = ({ heading, values, isSubmitting, setFieldValue }) => (
  <Form>
    <Typography variant="h4" my={2}>
      {heading}
    </Typography>
    <Grid container direction={"column"} spacing={3}>
      <Grid item>
        <Field
          label="Company"
          name="company"
          type="input"
          fullWidth={true}
          disabled={isSubmitting}
          as={TextField}
        />
      </Grid>
      <Grid item>
        <Field
          label="Position"
          name="position"
          type="input"
          fullWidth={true}
          disabled={isSubmitting}
          as={TextField}
        />
      </Grid>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date Applied"
            value={values.date}
            onChange={value => setFieldValue("date", value, true)}
            renderInput={params => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <Field
          label="Skills"
          name="skills"
          type="input"
          fullWidth={true}
          disabled={isSubmitting}
          as={TextField}
        />
      </Grid>
      <Grid item>
        <Field
          label="Contacts"
          name="contacts"
          type="input"
          fullWidth={true}
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

    {/* TODO: Delete this later, debugging purposes only. */}
    <pre>{JSON.stringify(values, null, 2)}</pre>
  </Form>
);

function FormField({ ...rest }) {
  return (
    <Grid item>
      <Field {...rest}></Field>
    </Grid>
  );
}

export default JobForm;
