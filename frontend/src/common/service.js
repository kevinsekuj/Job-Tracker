import axios from "axios";
import { JOBS_ENDPOINT_URL } from "common/constants";

export default async function getRowData(email) {
  const response = await axios.post(JOBS_ENDPOINT_URL, {
    userEmail: email,
  });
  if (response.status === 200) return response.data;
}
