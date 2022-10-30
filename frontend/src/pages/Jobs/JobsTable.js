import { Box, Button, Chip, Drawer } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { JOB_TABLE_COLUMN_STYLES } from "common/constants";
import { FormBox } from "pages/Jobs/index";
import { useState } from "react";
import { APPLICATION_FIELDS } from "../../common/constants";
import { AddJobForm, EditJobForm } from "./index";

const JobsTable = ({ rows, setRows }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [addDrawerState, setAddDrawerState] = useState(false);
  const [editDrawerState, setEditDrawerState] = useState(false);

  const toggleAddDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddDrawerState(open);
  };

  const toggleEditDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setEditDrawerState(open);
  };

  const handleCreateRow = newRow => {
    // TODO: send async update payload to server
    // if err, return no changes

    // On successful response
    setRows([newRow, ...rows]);
    setAddDrawerState(false);
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
    setEditDrawerState(false);
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
      width: JOB_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "position",
      headerName: APPLICATION_FIELDS.position,
      width: JOB_TABLE_COLUMN_STYLES.CELL_MD,
    },
    {
      field: "date",
      headerName: APPLICATION_FIELDS.date,
      width: JOB_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "status",
      headerName: APPLICATION_FIELDS.status,
      width: JOB_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "skills",
      headerName: APPLICATION_FIELDS.skills,
      width: JOB_TABLE_COLUMN_STYLES.CELL_LG,
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
      width: JOB_TABLE_COLUMN_STYLES.CELL_LG,
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
        <Button
          onClick={toggleAddDrawerIsOpen(true)}
          color="secondary"
          variant="contained"
          disableElevation
        >
          Add
        </Button>
        <Drawer
          anchor="right"
          open={addDrawerState}
          onClose={toggleAddDrawerIsOpen(false)}
        >
          <AddJobForm handleCreateRow={handleCreateRow} />
        </Drawer>
        <Button
          variant="outlined"
          onClick={toggleEditDrawerIsOpen(true)}
          disabled={selectedRows.length !== 1}
          sx={{ mx: 1 }}
        >
          Edit
        </Button>
        <Drawer
          anchor="right"
          open={editDrawerState}
          onClose={toggleEditDrawerIsOpen(false)}
        >
          {selectedRows.length === 1 && (
            <FormBox>
              <EditJobForm
                handleUpdateRow={handleUpdateRow}
                selectedRow={selectedRows[0]}
              />
            </FormBox>
          )}
        </Drawer>
        <Button
          variant="outlined"
          onClick={handleDeleteRows}
          disabled={selectedRows.length === 0}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ height: 600 }}>
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
    </>
  );
};

export default JobsTable;
