const DEFAULT_NAVBAR_ITEM_STYLE = {
  padding: "10px 5px",
};

const NavbarItem = ({ children, s, ...rest }) => {
  return (
    <div style={{ ...DEFAULT_NAVBAR_ITEM_STYLE, ...s }} {...rest}>
      {children}
    </div>
  );
};

export default NavbarItem;
