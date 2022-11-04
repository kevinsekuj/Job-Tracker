import PropTypes from "prop-types";

import JobForm from "pages/Jobs/JobForm";

import { APPLICATION_STATUSES } from "common/constants";

import dayjs from "dayjs";
import { Formik } from "formik";

/**
 * Edits an existing job application.
 */
export default function EditJobForm({ handleUpdateRow, selectedRow }) {
  const heading = "Edit Job Application";
  const formType = "edit";

  return (
    <Formik
      initialValues={{
        company: selectedRow?.company ?? "",
        position: selectedRow?.position ?? "",
        date: selectedRow?.date ?? dayjs(), // Same as date.now().
        jobStatus: selectedRow?.jobStatus ?? APPLICATION_STATUSES.applied,
        skills: selectedRow?.skills ?? "",
        contacts: selectedRow?.contacts ?? "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const newRow = {
          id: selectedRow.id,
          ...formData,
        };
        handleUpdateRow(newRow);
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

EditJobForm.propTypes = {
  handleUpdateRow: PropTypes.func.isRequired,
  selectedRow: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string,
    position: PropTypes.string,
    date: PropTypes.string,
    jobStatus: PropTypes.string,
    skills: PropTypes.string,
    contacts: PropTypes.string,
  }).isRequired,
};
