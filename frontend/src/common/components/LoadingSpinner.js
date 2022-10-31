import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => (
  <Box sx={{ margin: "5% auto" }}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
