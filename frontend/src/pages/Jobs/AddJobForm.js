import { APPLICATION_STATUSES } from "common/constants";
import dayjs from "dayjs";
import { Formik } from "formik";
import JobForm from "pages/Jobs/JobForm";

/**
 * Adds a new job application.
 * This will move to its own page eventually. Probably.
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

        // TODO: send async request w payload here
        // On successful response...
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
