import PropTypes from "prop-types";

import JobForm from "pages/Jobs/JobForm";

import { APPLICATION_STATUSES } from "common/constants";
import { processSkills } from "common/utils";

import dayjs from "dayjs";
import { Formik } from "formik";

/**
 * Edits an existing job application.
 */
export default function EditJobForm({
  handleUpdateRow,
  selectedRow,
  contacts,
}) {
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
        contactId: selectedRow.contactId ?? null,
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const newRow = {
          id: selectedRow.id,
          ...formData,
        };
        newRow.company = newRow.company.trim();
        newRow.position = newRow.position.trim();
        newRow.skills = processSkills(newRow.skills);
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
          contacts={contacts}
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
    skills: PropTypes.arrayOf(PropTypes.string),
    contactId: PropTypes.number,
    position: PropTypes.string,
    status: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
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
