import { AddJobForm, JobsTable } from "./index";

export default function JobsPage({ rows, setRows }) {
  return (
    <>
      <AddJobForm rows={rows} setRows={setRows} />
      <JobsTable rows={rows} setRows={setRows} />
    </>
  );
}
