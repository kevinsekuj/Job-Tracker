import { JobsTable } from "pages/Jobs/index";

const JobsPage = ({ rows, setRows }) => (
  <JobsTable rows={rows} setRows={setRows} />
);

export default JobsPage;
