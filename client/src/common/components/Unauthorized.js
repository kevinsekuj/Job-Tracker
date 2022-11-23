import { Alert, AlertTitle, Box } from "@mui/material";

export default function Unauthorized() {
  return (
    <Box sx={{ margin: "auto" }}>
      <Alert severity="info">
        <AlertTitle>Please sign in to start tracking jobs</AlertTitle>
        See the sign in button at the top!
      </Alert>
    </Box>
  );
}
