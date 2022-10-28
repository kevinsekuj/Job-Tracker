import Job from "../models/Job.js";
import { DUMMY_TABLE_DATA } from "../utils/constants.js";

export async function read(_req, res) {
  // const data = await Job.findAll();
  //res.json(DUMMY_TABLE_DATA);
  console.log("request received");
  res.status(200).json({ status: 200, data: DUMMY_TABLE_DATA });
}

export async function create(_req, _res) {
  //
}

export async function update(_req, _res) {
  //
}

export async function del(_req, _res) {
  //
}

export default { read, create, update, del };
