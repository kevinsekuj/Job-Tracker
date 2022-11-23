import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner() {
  return (
    <Box sx={{ margin: "5% auto" }}>
      <CircularProgress />
    </Box>
  );
}
