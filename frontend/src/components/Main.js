import JobTable from "./JobTable";
import { Navbar, NavbarItem } from "../common/components";

import { NAVBAR_ITEM_TITLES } from "../common/constants";
import { makeNavbarItems } from "../common/utils";

const Main = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar
        s={{
          margin: "1.5% 1% 1% 1%",
        }}
      >
        {makeNavbarItems(NAVBAR_ITEM_TITLES).map(item => (
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

      <h1 style={{ textAlign: "center" }}>Track Jobs</h1>
      <JobTable />
    </div>
  );
};

export default Main;
