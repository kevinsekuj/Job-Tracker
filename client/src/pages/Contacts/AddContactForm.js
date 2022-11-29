import PropTypes from "prop-types";

import ContactForm from "pages/Contacts/ContactForm";

import { Formik } from "formik";
/**
 * Adds a new contact.
 */
export default function AddContactForm({ userId, handleCreateRow }) {
  const heading = "New Contact";
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        const newRow = {
          userId: userId,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
        };
        handleCreateRow(newRow);
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

AddContactForm.propTypes = {
  userId: PropTypes.string.isRequired,
  handleCreateRow: PropTypes.func.isRequired,
};
