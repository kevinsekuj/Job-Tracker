import axios from "axios";
import { JOBS_ENDPOINT_URL } from "common/constants";
import formatDate from "common/utils";

/**
 *
 * @param {*} email
 * @returns
 */
const getJobsData = async email => {
  const response = await axios.get(JOBS_ENDPOINT_URL, {
    params: { userEmail: email },
  });
  if (response.status === 200) {
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
    case 200:
      const date = response.data.newRow.date;
      if (date && typeof date === "string") {
        response.data.newRow.date = formatDate(date);
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
    case 201:
    case 200:
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
 * @param {*} deleteIds
 * @returns
 */
const deleteJobRows = async deleteIds => {
  const response = await axios.delete(JOBS_ENDPOINT_URL, {
    data: { ids: deleteIds },
  });
  console.log(response);
  switch (response.status) {
    case 201:
    case 200:
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

export { getJobsData as getRowData, addJobRow, updateJobRow, deleteJobRows };
