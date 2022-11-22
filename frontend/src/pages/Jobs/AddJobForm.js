import PropTypes from "prop-types";

import JobForm from "pages/Jobs/JobForm";

import { APPLICATION_STATUSES } from "common/constants";
import { processSkills } from "common/utils";

import dayjs from "dayjs";
import { Formik } from "formik";
/**
 * Adds a new job application.
 */
export default function AddJobForm({ userId, handleCreateRow, contacts }) {
  const heading = "New Job Application";
  const formType = "add";
  return (
    <Formik
      initialValues={{
        company: "",
        position: "",
        dateApplied: dayjs(), // Same as date.now().
        status: APPLICATION_STATUSES.applied,
        skills: "",
        contactId: null,
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        const newRow = {
          userId: userId,
          ...formData,
        };
        newRow.skills = processSkills(newRow.skills);
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
          contacts={contacts}
        />
      )}
    </Formik>
  );
}

AddJobForm.propTypes = {
  userId: PropTypes.string.isRequired,
  handleCreateRow: PropTypes.func.isRequired,
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
