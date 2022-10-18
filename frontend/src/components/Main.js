import { Navbar, NavbarItem } from "../common/components";

const NAVBAR_ITEM_TITLES = ["Logo", "Jobs", "Contacts"];

const TABLE_HEADER_NAMES = [
  "Company",
  "Position",
  "Date",
  "Skills",
  "Contacts",
];

function makeNavbarItems(items) {
  return items.map(item => ({
    title: item,
    handleButtonClick() {
      console.log(`You clicked the ${item} button`);
    },
  }));
}

const Main = () => {
  return (
    <div className="Main">
      <Navbar style={{ display: "flex", margin: "auto 2%" }}>
        {makeNavbarItems(NAVBAR_ITEM_TITLES).map(item => (
          <NavbarItem key={item.title}>
            <button onClick={item.handleButtonClick}>{item.title}</button>
          </NavbarItem>
        ))}

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            justifyContent: "space-between",
            width: "5%",
          }}
        >
          <p>Hi, user</p>
          <button>Log out</button>
        </div>
      </Navbar>

      <div
        style={{
          margin: "2% auto",
          border: "2px dotted black",
          width: "50%",
          backgroundColor: "whitesmoke",
        }}
      >
        <table>
          <tbody style={{ textAlign: "center" }}>
            <tr>
              {TABLE_HEADER_NAMES.map(name => (
                <th>{name}</th>
              ))}
            </tr>
            <tr>
              <td>Amazon</td>
              <td>SDE 2023</td>
              <td>10/17/2022</td>
              <td>Python, AWS</td>
              <td>Literally any recruiter on LinkedIn</td>
            </tr>
            <tr>
              <td>Google</td>
              <td>SWE, Early Career</td>
              <td>10/17/2022</td>
              <td>Go, Docker, Kubernetes</td>
              <td>Nathan Perkins</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
