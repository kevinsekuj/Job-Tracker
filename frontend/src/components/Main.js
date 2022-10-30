import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ContactsPage from "../pages/Contacts/ContactsPage.js";
import JobsPage from "../pages/Jobs/JobsPage";
import SkillsPage from "../pages/Skills/SkillsPage.js";
import Navbar from "./Navbar";

import getRowData from "../common/service.js";

import { Box, Typography } from "@mui/material";

export default function Main() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchInitialTableData() {
      const { data } = await getRowData();
      setRows(data);
    }
    fetchInitialTableData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <Box sx={{ backgroundColor: "white", padding: "0 4em" }}>
          <Typography variant="h1" align="center" my={2}>
            Track Jerbs
          </Typography>

          <Routes>
            <Route
              path="/"
              element={<JobsPage rows={rows} setRows={setRows} />}
            />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route
              path="*"
              element={<JobsPage rows={rows} setRows={setRows} />}
            />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}
