import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Field, Form, Formik } from "formik";

import dayjs from "dayjs";

/**
 * Adds a new job application.
 * This will move to its own page eventually. Probably.
 */
export default function AddJobForm({ rows, setRows }) {
  return (
    <Box
      sx={{
        minWidth: 400,
        width: "30%",
        padding: "1em 4em",
        margin: "auto",
      }}
    >
      <Formik
        initialValues={{
          company: "",
          position: "",
          date: dayjs(), // Same as date.now().
          skills: "",
          contacts: "",
        }}
        onSubmit={(formData, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const newRow = {
            id: Math.random(),
            ...formData,
          };

          // TODO: send async request w payload here

          // On successful response use the id from DB, not random
          setRows([newRow, ...rows]);

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Typography variant="h4" my={2}>
              Add New Jerb
            </Typography>
            <Grid container direction={"column"} spacing={2}>
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
                <Button fullWidth type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>

            {/* TODO: Delete this later, debugging purposes only. */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
