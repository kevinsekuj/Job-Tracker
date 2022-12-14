import { forwardRef, useState } from "react";

import PropTypes from "prop-types";

import AddJobForm from "pages/Jobs/AddJobForm";
import EditJobForm from "pages/Jobs/EditJobForm";
import FormBox from "common/components/FormBox";

import { APPLICATION_FIELDS, JOB_TABLE_COLUMN_STYLES } from "common/constants";
import { addJobRow, deleteJobRows, updateJobRow } from "common/service";

import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Chip, Drawer, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";

const Alert = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

/**
 * The table component for Jobs page: displays jobs as rows.
 */
export default function JobsTable({ rows, setRows, contacts }) {
  const { user } = useAuth0();
  const [selectedRows, setSelectedRows] = useState([]);
  const [addJobDrawerIsOpen, setAddJobDrawerIsOpen] = useState(false);
  const [editJobDrawerState, setEditJobDrawerIsOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  const SNACKBAR = {
    successSeverity: "success",
    errorSeverity: "error",
    addSuccessMsg: "Added job.",
    editSuccessMsg: "Updated job.",
    deleteSuccessMsg:
      selectedRows.length > 1
        ? `Deleted ${selectedRows.length} job(s).`
        : "Deleted job.",
    errorMsg: "Oops, something went wrong. Please try again later.",
  };

  /**
   *
   * @param {*} _ (event, unused)
   * @param {*} reason
   * @param {*} setSnackOpen
   * @returns
   */
  const handleCloseSnackbar = (_, reason, setSnackOpen) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  /**
   *
   * @param {*} open
   * @returns
   */
  const toggleAddDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddJobDrawerIsOpen(open);
  };

  /**
   *
   * @param {*} open
   * @returns
   */
  const toggleEditDrawerIsOpen = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setEditJobDrawerIsOpen(open);
  };

  /**
   *
   * @param {*} userInputRow
   */
  const handleCreateRow = async userInputRow => {
    // TODO(dan): Input Validation for Create Row
    await addJobRow(userInputRow)
      .then(newRow => {
        setRows(rows.concat(newRow));
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

  /**
   *
   * @param {*} newRow
   */
  const handleUpdateRow = async userInputRow => {
    await updateJobRow(userInputRow)
      .then(updatedRow => {
        const rowsWithEdit = rows.map(row => {
          if (row.id === updatedRow.id) {
            return updatedRow;
          }
          return row;
        });
        const selectedRowsWithEdit = selectedRows.map(row => {
          if (row.id === updatedRow.id) {
            return updatedRow;
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
        setSnackbarSeverity(SNACKBAR.errorSeverity);
        setSnackbarIsOpen(true);
      });
  };

  /**
   *
   */
  const handleDeleteRows = async () => {
    const selectedIds = selectedRows.map(row => row.id);
    await deleteJobRows(selectedIds)
      .then(({ ids }) => {
        const rowsWithoutDeletes = rows.filter(row => !ids.includes(row.id));
        setRows(rowsWithoutDeletes);
        setSnackbarMessage(SNACKBAR.deleteSuccessMsg);
        setSnackbarSeverity(SNACKBAR.successSeverity);
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
      field: "dateApplied",
      headerName: APPLICATION_FIELDS.date,
      width: JOB_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "status",
      headerName: APPLICATION_FIELDS.jobStatus,
      width: JOB_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "skills",
      headerName: APPLICATION_FIELDS.skills,
      width: JOB_TABLE_COLUMN_STYLES.CELL_LG,
      renderCell: cellValues => {
        const skillsArray = cellValues.row.skills;
        if (skillsArray?.length === 1 && skillsArray[0] === "") {
          return null;
        }
        return (
          <Box>
            {skillsArray?.map(skill => (
              <Chip key={skill} sx={{ mr: "0.5em" }} label={skill} />
            ))}
          </Box>
        );
      },
    },
    {
      field: "contactId",
      headerName: APPLICATION_FIELDS.contact,
      width: JOB_TABLE_COLUMN_STYLES.CELL_LG,
      renderCell: cellValues => {
        const { contactId } = cellValues.row;
        const contact = contacts.find(ele => ele.id === contactId);
        if (!contact) {
          return <Box />;
        }
        return <Box>{`${contact.firstName} ${contact.lastName}`}</Box>;
      },
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
            <AddJobForm
              userId={user.sub}
              handleCreateRow={handleCreateRow}
              contacts={contacts}
            />
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
                contacts={contacts}
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
            const userSelectedRows = rows.filter(row =>
              selectedIDs.has(row.id)
            );
            setSelectedRows(userSelectedRows);
          }}
        />
        {/* Debugging purposes only. */}
        {process.env.NODE_ENV !== "production" && (
          <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
        )}
      </Box>
    </>
  );
}

JobsTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      createdAt: PropTypes.string,
      dateApplied: PropTypes.string,
      id: PropTypes.number,
      position: PropTypes.string,
      status: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      updatedAt: PropTypes.string,
      userId: PropTypes.string,
      contactId: PropTypes.number,
    })
  ).isRequired,
  setRows: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    })
  ).isRequired,
};
