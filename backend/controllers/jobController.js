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

/**
 * CREATE job, response provides new row columns with (new) associated id.
 * @param {Object} req.body Request payload.
 * @param {String} req.body.company
 * @param {String} req.body.position
 * @param {Date} req.body.date
 * @param {String} req.body.jobStatus
 * @param {String} req.body.skills
 * @param {String} req.body.contacts
 * @return {Object} res {status: Number, newRow: Object}
 */
export async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: id is determined by database and should not be provided`
      );
  }
  // const data = await Job...
  // TODO(any): replace with db row columns.
  const newRow = { id: Math.random(), ...req.body };
  res.status(201).json({ newRow: newRow });
}

/**
 * UPDATE job, response provides updated row columns.
 * @param {Object} req.body Request payload.
 * @param {String} req.body.company
 * @param {String} req.body.position
 * @param {Date} req.body.date
 * @param {String} req.body.jobStatus
 * @param {String} req.body.skills
 * @param {String} req.body.contacts
 * @return {Object} res {status: Number, updatedRow: Object}
 */
export async function update(req, res) {
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
  const updatedRow = req.body; // TODO(any): replace with db response.\
  res.status(200).json({ status: 200, updatedRow: updatedRow });
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
export async function removeAll(req, res) {
  const requestIds = req.body.ids;
  console.log(requestIds);
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
  const deletedIds = requestIds; // TODO(any): replace with Db deleted IDs
  res.status(200).json({ ids: deletedIds });
}

export default { read, getAll, getById, create, update, removeAll };
