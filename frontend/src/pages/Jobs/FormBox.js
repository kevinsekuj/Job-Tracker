import { Box } from "@mui/material";

const FormBox = ({ children }) => (
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

export default FormBox;
