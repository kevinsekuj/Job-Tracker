const NavbarItem = ({ children, ...rest }) => {
  return (
    <div style={{ display: "flex", padding: "0 3px" }} {...rest}>
      {children}
    </div>
  );
};

export default NavbarItem;
