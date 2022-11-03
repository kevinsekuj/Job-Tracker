import axios from "axios";
import { JOBS_ENDPOINT_URL } from "common/constants";
import formatDate from "common/utils";

/**
 *
 * @param {*} userId
 * @returns
 */
const getJobsData = async userId => {
  const response = await axios.get(JOBS_ENDPOINT_URL, {
    params: { userId: userId },
  });

  if (response.status === 200) {
    response.data.forEach(row => {
      // Apply nice formatting to date strings.
      const date = row.dateApplied;
      if (date && typeof date === "string") {
        row.dateApplied = formatDate(date);
      }
    });

    return response.data;
  }
};

/**
 *
 * @param {*} newRow
 * @returns
 */
const addJobRow = async newRow => {
  const response = await axios.post(JOBS_ENDPOINT_URL, newRow);
  switch (response.status) {
    case 201:
      const date = response.data.dateApplied;
      if (date && typeof date === "string") {
        response.data.dateApplied = formatDate(date);
      }
      return response.data;
    default:
      throw new Error(
        `Bad response: 
        status: ${response.status} 
        from /jobs POST route
        addJobRow() function`
      );
  }
};

/**
 *
 * @param {Number} updatedRow
 * @returns
 */
const updateJobRow = async updatedRow => {
  const response = await axios.put(
    JOBS_ENDPOINT_URL + `/${updatedRow.id}`,
    updatedRow
  );
  switch (response.status) {
    case 200:
      return response.data;
    default:
      throw new Error(
        `Bad response: 
        status: ${response.status} 
        from /jobs PUT route
        updateJobRow() function`
      );
  }
};

/**
 *
 * @param {*} deleteIds
 * @returns
 */
const deleteJobRows = async deleteIds => {
  const response = await axios.delete(JOBS_ENDPOINT_URL, {
    data: { ids: deleteIds },
  });
  switch (response.status) {
    case 200:
      return response.data;
    default:
      throw new Error(
        `Bad response: 
        status: ${response.status} 
        from /jobs DELETE route
        deleteJobRows() function`
      );
  }
};

export { getJobsData as getRowData, addJobRow, updateJobRow, deleteJobRows };
