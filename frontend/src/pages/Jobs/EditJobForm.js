import { APPLICATION_STATUSES } from "common/constants";
import dayjs from "dayjs";
import { Formik } from "formik";
import JobForm from "pages/Jobs/JobForm";

/**
 * Edits an existing job application.
 * This will move to its own page eventually. Probably.
 *
 * can update single row??
 */
const EditJobForm = ({ handleUpdateRow, selectedRow }) => {
  const heading = "Edit Job";
  const formType = "edit";
  return (
    <Formik
      initialValues={{
        company: selectedRow?.company ?? "",
        position: selectedRow?.position ?? "",
        date: selectedRow?.date ?? dayjs(), // Same as date.now().
        jobStatus: selectedRow?.status ?? APPLICATION_STATUSES.applied,
        skills: selectedRow?.skills ?? "",
        contacts: selectedRow?.contacts ?? "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const newRow = {
          id: selectedRow.id,
          ...formData,
        };

        // TODO: send async request w payload here
        // if err, do not update
        // On successful response
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
};

export default EditJobForm;
