import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import React from "react";

/**
 * Edits an existing job application.
 * This will move to its own page eventually. Probably.
 *
 * can update single row??
 */
export default function EditJobForm({ handleUpdateRow, selectedRow }) {
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
          company: selectedRow?.company ?? "",
          position: selectedRow?.position ?? "",
          date: selectedRow?.date ?? dayjs(), // Same as date.now().
          skills: selectedRow?.skills ?? "",
          contacts: selectedRow?.contacts ?? "",
        }}
        onSubmit={(formData, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const newRow = {
            id: selectedRow.id,
            ...formData,
          };

          // TODO: send async request w payload here
          // if err, do not update

          // On successful response
          handleUpdateRow(newRow);

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Typography variant="h4" my={2}>
              Edit Jerb
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
