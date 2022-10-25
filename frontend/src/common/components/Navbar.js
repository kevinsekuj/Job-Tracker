const DEFAULT_NAVBAR_STYLE = {
  display: "flex",
  justifyContent: "space-evenly",
  minHeight: "5%",
};

const NavBar = ({ children, s, ...rest }) => {
  return (
    <nav style={{ ...DEFAULT_NAVBAR_STYLE, ...s }} {...rest}>
      {children}
    </nav>
  );
};

export default NavBar;
