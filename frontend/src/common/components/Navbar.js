const NavBar = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export default NavBar;
