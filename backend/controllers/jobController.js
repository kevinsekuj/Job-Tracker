import { db } from "../utils/dbConnect.js";
import getIdFromUrlParam from "../utils/getIdFromUrlParam.js";

const { Job } = db.sequelize.models;

/**
 * READ jobs filtered by userId, response provides filtered rows.
 * @param {Object} req.body Request payload.
 * @param {String} req.body.company
 * @param {String} req.body.position
 * @param {Date} req.body.date
 * @param {String} req.body.status
 * @param {String} req.body.skills
 * @param {String} req.body.contacts
 * @return {Object} res {status: Number, newRow: Object}
 */
export async function getByUserId(req, res) {
  await Job.findAll({
    where: {
      userId: req.query.userId,
    },
  }).then(jobs => res.status(200).json(jobs));
}

export async function getByJobId(req, res) {
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
 * @param {String} req.body.status
 * @param {Array<String>} req.body.skills
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

  await Job.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(err => {
      res
        .status(500)
        .send(err.message || "An error occurred while creating new Job.");
    });
}

/**
 * UPDATE job, response provides updated row columns.
 * @param {Object} req.body Request payload.
 * @param {String} req.body.company
 * @param {String} req.body.position
 * @param {Date} req.body.dateApplied
 * @param {String} req.body.status
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
  await Job.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(numUpdatedRows => res.status(200).json(numUpdatedRows))
    .catch(err => {
      res
        .status(500)
        .send(err.message || "An error occurred while creating new Job.");
    });
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
export async function removeById(req, res) {
  const requestIds = req.body.ids;
  
  await Job.destroy({
    where: {
      id: requestIds,
    },
  })
    .then(() => {
      res.status(200).json({ ids: requestIds });
    })
    .catch(err => {
      res
        .status(500)
        .send(err.message || "An error occurred while removing selected Jobs.");
    });
}

export default { getByUserId, getByJobId, create, update, removeById };
