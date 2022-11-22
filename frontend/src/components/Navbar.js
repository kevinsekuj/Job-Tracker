import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "common/components/LoginButton";
import LogOutButton from "common/components/LogOutButton";

import { GITHUB_REPOSITORY_URL, NAVBAR_ITEMS } from "common/constants";
import ColorModeContext from "common/contexts";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="static"
      sx={{
        background: "#2b2d42",
        minHeight: { xs: "8%", sm: "7%", md: "5%" },
      }}
    >
      <Box
        sx={{
          margin: "0 5%",
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", marginRight: "1%" }}>
          <WorkIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", md: "inline-block" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            Job Tracker
          </Typography>
        </Box>

        <NavbarMenu sx={{ display: { xs: "block", sm: "none" } }} />

        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          {NAVBAR_ITEMS.map(page => (
            <RouterLink key={page.url} to={page.url}>
              <Button sx={{ color: "white" }}>{page.item}</Button>
            </RouterLink>
          ))}
        </Box>

        <Box
          sx={{
            margin: "0 1% 0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 0.25,
          }}
        >
          {isAuthenticated ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: { xs: 1, sm: 0.75, md: 0.5, lg: 0.4, xl: 0.3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 0.33,
                }}
              >
                <Avatar
                  sx={{ marginRight: "1%" }}
                  alt={user?.name || ""}
                  src={user?.picture || ""}
                />
                <Typography
                  sx={{ display: { xs: "none", md: "inline-block" } }}
                  noWrap
                  color="whitesmoke"
                  marginRight="8%"
                >
                  {user.name}
                </Typography>
              </Box>

              <Box>
                <LogOutButton />
              </Box>
            </Box>
          ) : (
            <LoginButton />
          )}
        </Box>

        <Box sx={{ display: "flex" }}>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <a
            href={GITHUB_REPOSITORY_URL}
            id="github-icon"
            style={{ paddingTop: "7px" }}
          >
            <GitHubIcon />
          </a>
        </Box>
      </Box>
    </AppBar>
  );
}

function NavbarMenu({ sx }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const isOpen = !!anchorElement;

  const handleOpenNavMenu = e => setAnchorElement(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElement(null);

  return (
    <Box sx={sx}>
      <IconButton onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorElement} open={isOpen} onClose={handleCloseNavMenu}>
        {NAVBAR_ITEMS.map(page => (
          <RouterLink
            key={page.item}
            to={page.url}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem sx={{ backgroundColor: "whitesmoke" }}>
              {page.item}
            </MenuItem>
          </RouterLink>
        ))}
      </Menu>
    </Box>
  );
}

NavbarMenu.propTypes = {
  sx: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

NavbarMenu.defaultProps = {
  sx: undefined,
};
