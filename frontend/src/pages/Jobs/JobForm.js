import { Button, Grid, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { JOB_FORM_ITEMS } from "common/constants.js";
import { Field, Form } from "formik";

const JobForm = ({ values, isSubmitting, setFieldValue }) => (
  <Form>
    <Typography variant="h4" my={2}>
      Add New Jerb
    </Typography>
    <Grid container direction="column" spacing={2}>
      {JOB_FORM_ITEMS.map(item => (
        <FormField
          key={item}
          label={item}
          name={item.toLowerCase()}
          type="input"
          fullWidth
          disabled={isSubmitting}
          as={TextField}
        />
      ))}
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
        <Button fullWidth type="submit">
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
