import ContactsTable from "pages/Contacts/ContactsTable";

import { Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { getContactsData } from "common/service";

export default function ContactsPage() {
  const { user } = useAuth0();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchInitialTableData() {
      const data = await getContactsData(user?.sub);
      setRows(data);
    }
    fetchInitialTableData();
  }, [user?.sub]);

  return (
    <>
      <Typography variant="h1" align="center" my={2}>
        Contacts
      </Typography>
      <ContactsTable rows={rows} setRows={setRows} />
    </>
  );
}
