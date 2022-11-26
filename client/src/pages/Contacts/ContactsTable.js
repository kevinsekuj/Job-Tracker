import { forwardRef, useState } from "react";

import PropTypes from "prop-types";

import AddContactForm from "pages/Contacts/AddContactForm";
import EditContactForm from "pages/Contacts/EditContactForm";
import FormBox from "common/components/FormBox";

import { CONTACT_FIELDS, CONTACT_TABLE_COLUMN_STYLES } from "common/constants";

import {
  addContactRow,
  deleteContactsRows,
  updateContactRow,
} from "common/service";

import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Drawer, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";

const Alert = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

/**
 * The table component for Contacts page: displays contacts as rows.
 */
export default function ContactsTable({ rows, setRows }) {
  const { user } = useAuth0();
  const [selectedRows, setSelectedRows] = useState([]);
  const [addContactDrawerIsOpen, setAddContactDrawerIsOpen] = useState(false);
  const [editContactDrawerState, setEditContactDrawerIsOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  const SNACKBAR = {
    successSeverity: "success",
    errorSeverity: "error",
    addSuccessMsg: "Added contact.",
    editSuccessMsg: "Updated contact.",
    deleteSuccessMsg:
      selectedRows.length > 1
        ? `Deleted ${selectedRows.length} contact(s).`
        : "Deleted contact.",
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
    setAddContactDrawerIsOpen(open);
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
    setEditContactDrawerIsOpen(open);
  };

  /**
   *
   * @param {*} userInputRow
   */
  const handleCreateRow = async userInputRow => {
    // TODO(dan): Input Validation for Create Row
    await addContactRow(userInputRow)
      .then(newRow => {
        setRows(rows.concat(newRow));
        setAddContactDrawerIsOpen(false);
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
    await updateContactRow(userInputRow)
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
        setEditContactDrawerIsOpen(false);
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
    await deleteContactsRows(selectedIds)
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
    // { field: "id", headerName: CONTACT_FIELDS.id, width: 90 },
    {
      field: "firstName",
      headerName: CONTACT_FIELDS.firstName,
      width: CONTACT_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "lastName",
      headerName: CONTACT_FIELDS.lastName,
      width: CONTACT_TABLE_COLUMN_STYLES.CELL_SM,
    },
    {
      field: "email",
      headerName: CONTACT_FIELDS.email,
      width: CONTACT_TABLE_COLUMN_STYLES.CELL_MD,
    },
    {
      field: "phoneNumber",
      headerName: CONTACT_FIELDS.phoneNumber,
      width: CONTACT_TABLE_COLUMN_STYLES.CELL_SM,
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
          open={addContactDrawerIsOpen}
          onClose={toggleAddDrawerIsOpen(false)}
        >
          <FormBox>
            <AddContactForm
              userId={user.sub}
              handleCreateRow={handleCreateRow}
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
          open={editContactDrawerState}
          onClose={toggleEditDrawerIsOpen(false)}
        >
          {selectedRows.length === 1 && (
            <FormBox>
              <EditContactForm
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

ContactsTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      createdAt: PropTypes.string,
      id: PropTypes.number,
      phoneNumber: PropTypes.string,
      email: PropTypes.string,
      updatedAt: PropTypes.string,
      userId: PropTypes.string,
    })
  ).isRequired,
  setRows: PropTypes.func.isRequired,
};
