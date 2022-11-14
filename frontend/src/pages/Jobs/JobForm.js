import PropTypes from "prop-types";

import { APPLICATION_STATUSES } from "common/constants";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Field, Form } from "formik";

export default function JobForm({
  formType,
  heading,
  values,
  isSubmitting,
  setFieldValue,
}) {
  return (
    <Form>
      <Typography variant="h4" my={2}>
        {heading}
      </Typography>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Field
            label="Company"
            name="company"
            type="input"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <Field
            label="Position"
            name="position"
            type="input"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date Applied"
              value={values.dateApplied}
              onChange={value => setFieldValue("dateApplied", value, true)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={params => <TextField {...params} fullWidth />}
              disableFuture
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id={`${`${formType}-select-label`}`}>Status</InputLabel>
            <Select
              labelId={`${`${formType}-select-label`}`}
              id={`${`${formType}-select`}`}
              label="Status"
              value={values.status}
              onChange={event => {
                setFieldValue("status", event.target.value, true);
              }}
            >
              {Object.values(APPLICATION_STATUSES).map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Field
            label="Skills (comma-separated)"
            name="skills"
            type="input"
            fullWidth
            disabled={isSubmitting}
            as={TextField}
          />
        </Grid>
        <Grid item>
          <Field
            label="Contacts"
            name="contacts"
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

      {/* TODO: Delete this later, debugging purposes only. */}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Form>
  );
}

JobForm.propTypes = {
  formType: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,

  values: PropTypes.shape({
    company: PropTypes.string,
    contacts: PropTypes.string,
    dateApplied: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Object),
    ]).isRequired,
    position: PropTypes.string,
    skills: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,

  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};
