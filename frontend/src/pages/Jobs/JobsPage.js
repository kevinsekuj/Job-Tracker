import PropTypes from "prop-types";

import JobsTable from "pages/Jobs/JobsTable";

import { Typography } from "@mui/material";

export default function JobsPage({ rows, setRows }) {
  return (
    <>
      <Typography variant="h1" align="center" my={2}>
        Track Jobs
      </Typography>
      <JobsTable rows={rows} setRows={setRows} />
    </>
  );
}

JobsPage.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      contacts: PropTypes.string,
      date: PropTypes.string,
      id: PropTypes.number,
      jobStatus: PropTypes.string,
      position: PropTypes.string,
      skills: PropTypes.string,
    })
  ).isRequired,
  setRows: PropTypes.func.isRequired,
};
