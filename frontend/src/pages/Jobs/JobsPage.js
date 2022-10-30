import { AddJobForm, FormBox, JobsTable } from "pages/Jobs/index";

const JobsPage = ({ rows, setRows }) => (
  <>
    <FormBox>
      <AddJobForm rows={rows} setRows={setRows} />
    </FormBox>
    <JobsTable rows={rows} setRows={setRows} />
  </>
);

export default JobsPage;
