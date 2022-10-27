import * as React from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { APPLICATION_FIELDS } from "../common/constants";

/**
 *
 */
export default function JobsGrid(props) {
  const columns = [
    // Can add this if we want to view id's as well
    // { field: "id", headerName: APPLICATION_FIELDS.id, width: 90 },
    {
      field: "company",
      headerName: APPLICATION_FIELDS.company,
      width: styles.CELL_SM,
    },
    {
      field: "position",
      headerName: APPLICATION_FIELDS.position,
      width: styles.CELL_MD,
    },
    {
      field: "date",
      headerName: APPLICATION_FIELDS.date,
      width: styles.CELL_SM,
    },
    {
      field: "status",
      headerName: APPLICATION_FIELDS.status,
      width: styles.CELL_SM,
    },
    {
      field: "skills",
      headerName: APPLICATION_FIELDS.skills,
      width: styles.CELL_LG,
    },
    {
      field: "contacts",
      headerName: APPLICATION_FIELDS.contacts,
      width: styles.CELL_LG,
    },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={25}
        checkboxSelection
      />
    </Box>
  );
}

const styles = {
  CELL_SM: 200,
  CELL_MD: 300,
  CELL_LG: 400,
};
