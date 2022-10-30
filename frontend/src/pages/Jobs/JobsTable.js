import { useState } from "react";

import { EditJobForm } from "./index";

import { APPLICATION_FIELDS } from "../../common/constants";

import { Box, Button, Chip, Drawer } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const COLUMN_STYLES = {
  CELL_SM: 200,
  CELL_MD: 300,
  CELL_LG: 400,
};

export default function JobsTable({ rows, setRows }) {
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
      width: COLUMN_STYLES.CELL_SM,
    },
    {
      field: "position",
      headerName: APPLICATION_FIELDS.position,
      width: COLUMN_STYLES.CELL_MD,
    },
    {
      field: "date",
      headerName: APPLICATION_FIELDS.date,
      width: COLUMN_STYLES.CELL_SM,
    },
    {
      field: "status",
      headerName: APPLICATION_FIELDS.status,
      width: COLUMN_STYLES.CELL_SM,
    },
    {
      field: "skills",
      headerName: APPLICATION_FIELDS.skills,
      width: COLUMN_STYLES.CELL_LG,
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
      width: COLUMN_STYLES.CELL_LG,
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
      <Button onClick={handleDeleteRows} disabled={selectedRows.length === 0}>
        Delete
      </Button>
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
