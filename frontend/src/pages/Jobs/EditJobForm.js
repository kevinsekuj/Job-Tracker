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
        dateApplied: selectedRow?.dateApplied ?? dayjs(), // Same as date.now().
        status: selectedRow?.status ?? APPLICATION_STATUSES.applied,
        skills: selectedRow?.skills.join(", ") ?? "",
        contacts: selectedRow?.contacts ?? "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const newRow = {
          id: selectedRow.id,
          ...formData,
        };
        newRow.skills = newRow.skills.split(",");
        newRow.skills.forEach((skill, index) => {
          newRow.skills[index] = skill.trim();
        });
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
    company: PropTypes.string,
    createdAt: PropTypes.string,
    dateApplied: PropTypes.string,
    id: PropTypes.number,
    skills: PropTypes.string,
    contacts: PropTypes.string,
    position: PropTypes.string,
    status: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};
