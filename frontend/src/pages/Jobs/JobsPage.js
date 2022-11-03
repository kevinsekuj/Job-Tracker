import { Typography } from "@mui/material";
import { JobsTable } from "pages/Jobs/index";

const JobsPage = ({ rows, setRows }) => (
  <>
    <Typography variant="h1" align="center" my={2}>
      Track Jerbs
    </Typography>
    <JobsTable rows={rows} setRows={setRows} />
  </>
);

export default JobsPage;
