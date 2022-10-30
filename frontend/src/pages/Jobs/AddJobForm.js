import dayjs from "dayjs";
import { Formik } from "formik";
import JobForm from "pages/Jobs/JobForm";

/**
 * Adds a new job application.
 * This will move to its own page eventually. Probably.
 */
const AddJobForm = ({ rows, setRows }) => (
  <Formik
    initialValues={{
      company: "",
      position: "",
      date: dayjs(), // Same as date.now().
      skills: "",
      contacts: "",
    }}
    onSubmit={(formData, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      const newRow = {
        id: Math.random(),
        ...formData,
      };

      // TODO: send async request w payload here

      // On successful response use the id from DB, not random
      setRows([newRow, ...rows]);

      setSubmitting(false);
      resetForm();
    }}
  >
    {({ values, isSubmitting, setFieldValue }) => (
      <JobForm
        values={values}
        isSubmitting={isSubmitting}
        setFieldValue={setFieldValue}
      />
    )}
  </Formik>
);

export default AddJobForm;
