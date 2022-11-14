import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import LoadingSpinner from "common/components/LoadingSpinner";
import Unauthorized from "common/components/Unauthorized";
import Navbar from "components/Navbar";
import { ContactsPage, JobsPage, SkillsPage } from "pages/index";

import { getRowData } from "common/service";

import { Box } from "@mui/material";

export default function Main() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [rows, setRows] = useState([]);
  const skillsMap = useRef(new Map());

  useEffect(() => {
    async function fetchInitialTableData() {
      const data = await getRowData(user?.sub);

      data.forEach(dataObject => {
        // Count skill occurrences.
        dataObject.skills?.forEach(skill => {
          if (skillsMap.current.has(skill)) {
            skillsMap[skill] += 1;
          } else {
            skillsMap.current.set(skill, 1);
          }
        });
      });

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
                <Routes>
                  <Route
                    path="/"
                    element={<JobsPage rows={rows} setRows={setRows} />}
                  />
                  <Route path="contacts" element={<ContactsPage />} />
                  <Route
                    path="skills"
                    element={
                      <SkillsPage
                        skillsMap={skillsMap.current}
                        totalJobs={rows.length}
                      />
                    }
                  />
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
}
