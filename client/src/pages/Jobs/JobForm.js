import PropTypes from "prop-types";

import { Link as RouterLink } from "react-router-dom";

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
  contacts,
  isSubmitting,
  setFieldValue,
}) {
  const sortedContacts = [...contacts].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

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
            <InputLabel id={`${`${formType}-select-status-label`}`}>
              Status
            </InputLabel>
            <Select
              labelId={`${`${formType}-select-status-label`}`}
              id={`${`${formType}-select-status`}`}
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
          {sortedContacts.length > 0 ? (
            <FormControl fullWidth>
              <InputLabel id={`${`${formType}-select-contact-label`}`}>
                Contact
              </InputLabel>
              <Select
                labelId={`${`${formType}-select-contact-label`}`}
                id={`${`${formType}-select-contact`}`}
                label="Contact"
                value={values.contactId}
                disabled={sortedContacts.length === 0}
                onChange={event => {
                  setFieldValue("contactId", event.target.value, true);
                }}
              >
                {sortedContacts.map(contact => (
                  <MenuItem key={contact.id} value={contact.id}>
                    {`${contact.firstName} ${contact.lastName}`}
                  </MenuItem>
                ))}
                <MenuItem value={null}>No Contact</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography variant="body2">
              <RouterLink id="contact-link" to="/contacts">
                Create a contact
              </RouterLink>{" "}
              to associate them with this job.
            </Typography>
          )}
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

JobForm.propTypes = {
  formType: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,

  values: PropTypes.shape({
    company: PropTypes.string,
    contactId: PropTypes.number,
    dateApplied: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Object),
    ]).isRequired,
    position: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  }).isRequired,

  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    })
  ).isRequired,
};
