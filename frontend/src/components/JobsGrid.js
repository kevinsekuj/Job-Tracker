import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import * as React from "react";
import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { Drawer } from "@mui/material";
import { APPLICATION_FIELDS } from "../common/constants";
import EditJobForm from "./EditJobForm";

/**
 *
 */
export default function JobsGrid({ rows, setRows }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  const handleUpdateRow = newRow => {
    // TODO: send async update payload to server
    // if err, return no changes

    // On successful response
    const rowsWithEdit = rows.map(row => {
      if (row.id === newRow.id) {
        return newRow;
      }
      return row;
    });
    const selectedRowsWithEdit = selectedRows.map(row => {
      if (row.id === newRow.id) {
        return newRow;
      }
      return row;
    });

    setRows(rowsWithEdit);
    setSelectedRows(selectedRowsWithEdit);
    setDrawerState(false);
  };

  const handleDeleteRows = () => {
    // TODO: send async delete payload to server
    // if err, return no changes

    // On successful response
    const selectedIds = selectedRows.map(row => row.id);
    const rowsWithoutDeletes = rows.filter(
      row => !selectedIds.includes(row.id)
    );
    setRows(rowsWithoutDeletes);
  };

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
      renderCell: cellValues => {
        const skillsArray = cellValues.row.skills.split(",");
        if (skillsArray.length === 1 && skillsArray[0] === "") {
          return null;
        }
        return (
          <>
            {skillsArray.map(skill => {
              return <Chip key={skill} sx={{ mr: "0.5em" }} label={skill} />;
            })}
          </>
        );
      },
    },
    {
      field: "contacts",
      headerName: APPLICATION_FIELDS.contacts,
      width: styles.CELL_LG,
    },
  ];

  return (
    <Box sx={{ height: 500 }}>
      <Button
        onClick={toggleDrawerIsOpen(true)}
        disabled={selectedRows.length !== 1}
      >
        Edit
      </Button>
      <Button onClick={handleDeleteRows}>Delete</Button>
      <Drawer
        anchor="right"
        open={drawerState}
        onClose={toggleDrawerIsOpen(false)}
      >
        {selectedRows.length === 1 && (
          <EditJobForm
            handleUpdateRow={handleUpdateRow}
            selectedRow={selectedRows[0]}
          />
        )}
      </Drawer>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        checkboxSelection
        onSelectionModelChange={ids => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter(row => selectedIDs.has(row.id));
          setSelectedRows(selectedRows);
        }}
      />
      <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
    </Box>
  );
}

const styles = {
  CELL_SM: 200,
  CELL_MD: 300,
  CELL_LG: 400,
};
