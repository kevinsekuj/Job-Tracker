import PropTypes from "prop-types";

import { Box } from "@mui/material";

export default function FormBox({ children }) {
  return (
    <Box
      sx={{
        minWidth: 400,
        width: "30%",
        padding: "1em 4em",
        margin: "auto",
      }}
    >
      {children}
    </Box>
  );
}

FormBox.propTypes = {
  children: PropTypes.node,
};

FormBox.defaultProps = {
  children: undefined,
};
