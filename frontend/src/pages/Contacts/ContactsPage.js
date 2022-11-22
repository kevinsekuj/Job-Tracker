import PropTypes from "prop-types";

import ContactsTable from "pages/Contacts/ContactsTable";

import { Typography } from "@mui/material";

export default function ContactsPage({ contacts: rows, setContacts: setRows }) {
  return (
    <>
      <Typography variant="h1" align="center" my={2}>
        Contacts
      </Typography>
      <ContactsTable rows={rows} setRows={setRows} />
    </>
  );
}

ContactsPage.propTypes = {
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
  setContacts: PropTypes.func.isRequired,
};
