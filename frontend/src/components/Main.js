import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Navbar, NavbarItem } from "../common/components";
import { DUMMY_TABLE_DATA, NAVBAR_ITEM_TITLES } from "../common/constants";
import { makeNavbarItems } from "../common/utils";
import AddJobForm from "./AddJobForm";
import JobsGrid from "./JobsGrid";

/**
 * Primary component in the React tree.
 */
const Main = () => {
  const [rows, setRows] = useState(DUMMY_TABLE_DATA);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar
        s={{
          margin: "0.5% 1% 0.5% 1%",
        }}
      >
        {makeNavbarItems(NAVBAR_ITEM_TITLES).map((item) => (
          <NavbarItem key={item.title}>
            <button style={{ height: "100%" }} onClick={item.handleButtonClick}>
              {item.title}
            </button>
          </NavbarItem>
        ))}

        <NavbarItem
          s={{
            marginLeft: "auto",
          }}
        >
          <button style={{ height: "100%" }}>Log out</button>
        </NavbarItem>
      </Navbar>

      <Box sx={{ backgroundColor: "white", padding: "0 4em" }}>
        <Typography variant="h1" align="center" my={2}>
          Track Jerbs
        </Typography>
        <AddJobForm rows={rows} setRows={setRows} />
        <JobsGrid rows={rows} />
      </Box>
    </div>
  );
};

export default Main;
