import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "common/components/LoadingSpinner";
import Unauthorized from "common/components/Unauthorized";
import { getRowData } from "common/service.js";
import Navbar from "components/Navbar";
import { ContactsPage, JobsPage, SkillsPage } from "pages/index";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Main = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchInitialTableData() {
      const data = await getRowData(user?.sub);
      setRows(data);
    }
    if (isAuthenticated) fetchInitialTableData();
  }, [isAuthenticated, user?.sub]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Router>
        <Navbar />
        {(() => {
          if (isLoading) {
            return <LoadingSpinner />;
          }
          if (isAuthenticated) {
            return (
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
            );
          }
          return <Unauthorized />;
        })()}
      </Router>
    </div>
  );
};

export default Main;
