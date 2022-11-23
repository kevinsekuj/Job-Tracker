import PropTypes from "prop-types";

import ContactForm from "pages/Contacts/ContactForm";

import { Formik } from "formik";

/**
 * Edits an existing job application.
 */
export default function EditContactForm({ handleUpdateRow, selectedRow }) {
  const heading = "Edit Contact";
  return (
    <Formik
      initialValues={{
        firstName: selectedRow?.firstName ?? "",
        lastName: selectedRow?.lastName ?? "",
        email: selectedRow?.email ?? "",
        phoneNumber: selectedRow?.phoneNumber ?? "",
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
      {({ values, isSubmitting }) => (
        <ContactForm
          heading={heading}
          values={values}
          isSubmitting={isSubmitting}
        />
      )}
    </Formik>
  );
}

EditContactForm.propTypes = {
  handleUpdateRow: PropTypes.func.isRequired,
  selectedRow: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    id: PropTypes.number,
    skills: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};
