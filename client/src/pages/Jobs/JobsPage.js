import PropTypes from "prop-types";

import JobsTable from "pages/Jobs/JobsTable";

import { Typography } from "@mui/material";

export default function JobsPage({ rows, setRows, contacts }) {
  return (
    <>
      <Typography variant="h1" align="center" my={2}>
        Track Jobs
      </Typography>
      <JobsTable rows={rows} setRows={setRows} contacts={contacts} />
    </>
  );
}

JobsPage.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      createdAt: PropTypes.string,
      dateApplied: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.string,
      status: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      updatedAt: PropTypes.string,
      userId: PropTypes.string,
      contactId: PropTypes.contactId,
    })
  ).isRequired,
  setRows: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    })
  ).isRequired,
};
