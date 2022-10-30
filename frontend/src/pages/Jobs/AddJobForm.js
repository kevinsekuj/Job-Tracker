import { APPLICATION_STATUSES } from "common/constants";
import dayjs from "dayjs";
import { Formik } from "formik";
import JobForm from "pages/Jobs/JobForm";

/**
 * Adds a new job application.
 * This will move to its own page eventually. Probably.
 */
const AddJobForm = ({ handleCreateRow }) => {
  const heading = "Add New Job";
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
          id: Math.random(),
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
