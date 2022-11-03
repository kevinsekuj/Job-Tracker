import { JobsTable } from "pages/Jobs/index";

import { Typography } from "@mui/material";

const JobsPage = ({ rows, setRows }) => (
  <>
    <Typography variant="h1" align="center" my={2}>
      Track Jobs
    </Typography>
    <JobsTable rows={rows} setRows={setRows} />
  </>
);

export default JobsPage;
