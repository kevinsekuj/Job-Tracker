import axios from "axios";
import { JOBS_ENDPOINT_URL } from "./constants";

export default async function getRowData() {
  const response = await axios.get(JOBS_ENDPOINT_URL);
  if (response.status === 200) return response.data;
}
