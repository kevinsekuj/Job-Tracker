import PropTypes from "prop-types";

import JobForm from "pages/Jobs/JobForm";

import { APPLICATION_STATUSES } from "common/constants";

import dayjs from "dayjs";
import { Formik } from "formik";

/**
 * Adds a new job application.
 */
export default function AddJobForm({ handleCreateRow }) {
  const heading = "New Job Application";
  const formType = "add";
  return (
    <Formik
      initialValues={{
        company: "",
        position: "",
        date: dayjs(), // Same as date.now().
        jobStatus: APPLICATION_STATUSES.applied,
        skills: "",
        contacts: "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        const newRow = {
          ...formData,
        };
        handleCreateRow(newRow);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <JobForm
          formType={formType}
          heading={heading}
          values={values}
          isSubmitting={isSubmitting}
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  );
}

AddJobForm.propTypes = {
  handleCreateRow: PropTypes.func.isRequired,
};
