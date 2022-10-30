import { Box, Typography } from "@mui/material";
import getRowData from "common/service.js";
import Navbar from "components/Navbar";
import { ContactsPage, JobsPage, SkillsPage } from "pages/index";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Main = () => {
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
        <Box sx={{ padding: "0 4em" }}>
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
};

export default Main;
