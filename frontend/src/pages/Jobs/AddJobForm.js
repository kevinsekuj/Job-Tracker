import JobForm from "pages/Jobs/JobForm";

import { APPLICATION_STATUSES } from "common/constants";

import dayjs from "dayjs";
import { Formik } from "formik";

/**
 * Adds a new job application.
 */
const AddJobForm = ({ userId, handleCreateRow }) => {
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
        contacts: "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        const newRow = {
          userId: userId,
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
};

export default AddJobForm;
