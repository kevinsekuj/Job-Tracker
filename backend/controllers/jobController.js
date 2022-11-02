import { db } from "../utils/dbConnect.js";
import getIdFromUrlParam from "../utils/getIdFromUrlParam.js";

const { Job } = db.sequelize.models;

import { DUMMY_TABLE_DATA } from "../utils/constants.js";

export async function read(req, res) {
  // const data = await Job.findAll();
  //res.json(DUMMY_TABLE_DATA);
  console.log("request received");
  res.status(200).json({ status: 200, data: DUMMY_TABLE_DATA });
}

export async function getAll(req, res) {
  const jobs = await Job.findAll();
  res.status(200).json(jobs);
}

export async function getById(req, res) {
  const id = getIdFromUrlParam(req);
  const job = await Job.findByPk(id);

  if (!job) {
    res.status(404).send("404 - Not found");
  }

  res.status(200).json(job);
}

export async function create(req, res) {
  console.log("JOB POST request received:", req?.body);
  res.status(200).json({ status: 200, data: "new Row" });
}

export async function update(req, res) {
  console.log("JOB PUT request received");
  const id = getIdFromUrlParam(req);

  // Only accept update request if `:id` URL param matches body `id` param
  if (req.body.id !== id) {
    res
      .status(400)
      .send(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      );
  }

  // await Job.update(req.body, {
  //   where: {
  //     id: id,
  //   },
  // });
  res.status(200).json({ status: 200, data: "updated Row" });
}

export async function remove(req, res) {
  console.log("JOB DELETE request received");
  const id = getIdFromUrlParam(req);

  // await Job.destroy({
  //   where: {
  //     id: id,
  //   },
  // });

  res.status(200).json({ status: 200, data: "deleted Row" });
}

export async function removeAll(req, res) {
  console.log("JOB DELETE ALL request received");
  const ids = req.body.ids;
  console.log(ids);
  res.send(200).json({ status: 200, data: "deleted Row IDs" });

  // Job.destroy({
  //   truncate: true,
  // })
  //   .then(numRowsDeleted => {
  //     res.status(200).send(`${numRowsDeleted} Jobs removed successfully.`);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .send(err.message || "An error occurred while removing all Jobs.");
  //   });
}

export default { read, getAll, getById, create, update, remove, removeAll };
