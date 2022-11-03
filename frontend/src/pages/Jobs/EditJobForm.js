import JobForm from "pages/Jobs/JobForm";

import { APPLICATION_STATUSES } from "common/constants";

import dayjs from "dayjs";
import { Formik } from "formik";

/**
 * Edits an existing job application.
 */
const EditJobForm = ({ handleUpdateRow, selectedRow }) => {
  const heading = "Edit Job Application";
  const formType = "edit";
  return (
    <Formik
      initialValues={{
        company: selectedRow?.company ?? "",
        position: selectedRow?.position ?? "",
        date: selectedRow?.date ?? dayjs(), // Same as date.now().
        jobStatus: selectedRow?.jobStatus ?? APPLICATION_STATUSES.applied,
        skills: selectedRow?.skills ?? "",
        contacts: selectedRow?.contacts ?? "",
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
