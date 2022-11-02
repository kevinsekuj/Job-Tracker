import { Box, Button, Chip, Drawer, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { JOB_TABLE_COLUMN_STYLES } from "common/constants";
import { FormBox } from "pages/Jobs/index";
import { forwardRef, useState } from "react";
import { APPLICATION_FIELDS } from "../../common/constants";
import { AddJobForm, EditJobForm } from "./index";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SNACKBAR = {
  successSeverity: "success",
  errorSeverity: "error",
  addSuccessMsg: "Added job.",
  editSuccessMsg: "Updated job.",
  deleteSuccessMsg: "Deleted job(s).",
  errorMsg: "Oops, something went wrong. Please try again later.",
};

/**
 * The table component for Jobs page: displays jobs as rows.
 */
const JobsTable = ({ rows, setRows }) => {
  const { REACT_APP_JOBS_ENDPOINT_URL } = process.env;
  const [selectedRows, setSelectedRows] = useState([]);
  const [addJobDrawerIsOpen, setAddJobDrawerIsOpen] = useState(false);
  const [editJobDrawerState, setEditJobDrawerIsOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  // Handler to close confirmation/error UI snackbars.
  const handleCloseSnackbar = (_, reason, setSnackOpen) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  // Handler to open and close job-app-add UI side drawer.
  const toggleAddDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddJobDrawerIsOpen(open);
  };

  // Handler to open and close the job-app-edit UI side drawer.
  const toggleEditDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setEditJobDrawerIsOpen(open);
  };

  // Handler on-form-submit for server-side request of new job-app.
  const handleCreateRow = newRow => {
    // TODO(dan): Input Validation for Create Row
    axios
      .post(REACT_APP_JOBS_ENDPOINT_URL, newRow)
      .then(res => {
        // TODO(dan): use response row data to add row
        setRows([newRow, ...rows]);
        setAddJobDrawerIsOpen(false);
        setSnackbarMessage(SNACKBAR.addSuccessMsg);
        setSnackbarSeverity(SNACKBAR.successSeverity);
        setSnackbarIsOpen(true);
      })
      .catch(err => {
        setSnackbarMessage(SNACKBAR.errorMsg);
        setSnackbarSeverity(SNACKBAR.errorSeverity);
        setSnackbarIsOpen(true);
      });
  };

  // Handler on-form-submit for server-side request of updated job-app fields.
  const handleUpdateRow = async newRow => {
    // TODO(dan): Input Validation for Create Row
    axios
      .put(REACT_APP_JOBS_ENDPOINT_URL + `/${newRow.id}`, newRow)
      .then(res => {
        // TODO(dan): use response row data to edit row
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
        setEditJobDrawerIsOpen(false);
        setSnackbarMessage(SNACKBAR.editSuccessMsg);
        setSnackbarSeverity(SNACKBAR.success);
        setSnackbarIsOpen(true);
      })
      .catch(err => {
        setSnackbarMessage(SNACKBAR.errorMsg);
        setSnackbarSeverity(SNACKBAR.error);
        setSnackbarIsOpen(true);
      });
  };

  // Handler on-table-delete for server-side request of job-app deletion.
  const handleDeleteRows = () => {
    const selectedIds = selectedRows.map(row => row.id);
    axios
      .delete(REACT_APP_JOBS_ENDPOINT_URL, { data: { ids: selectedIds } })
      .then(res => {
        const rowsWithoutDeletes = rows.filter(
          row => !selectedIds.includes(row.id)
        );
        setRows(rowsWithoutDeletes);
        setSnackbarMessage(SNACKBAR.deleteSuccessMsg);
        setSnackbarSeverity(SNACKBAR.success);
        setSnackbarIsOpen(true);
      })
      .catch(err => {
        setSnackbarMessage(SNACKBAR.errorMsg);
        setSnackbarSeverity(SNACKBAR.errorSeverity);
        setSnackbarIsOpen(true);
      });
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
      field: "jobStatus",
      headerName: APPLICATION_FIELDS.jobStatus,
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
          variant="contained"
          disableElevation
        >
          NEW
        </Button>
        <Drawer
          anchor="right"
          open={addJobDrawerIsOpen}
          onClose={toggleAddDrawerIsOpen(false)}
        >
          <FormBox>
            <AddJobForm handleCreateRow={handleCreateRow} />
          </FormBox>
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
          open={editJobDrawerState}
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
          color="error"
          onClick={handleDeleteRows}
          disabled={selectedRows.length === 0}
        >
          Delete
        </Button>
      </Box>
      <Snackbar
        open={snackbarIsOpen}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          handleCloseSnackbar(event, reason, setSnackbarIsOpen);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            handleCloseSnackbar(event, reason, setSnackbarIsOpen);
          }}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
