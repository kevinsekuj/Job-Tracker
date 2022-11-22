import { db } from "../utils/dbConnect.js";
import getIdFromUrlParam from "../utils/getIdFromUrlParam.js";

const { Contact } = db.sequelize.models;

/**
 * READ contacts filtered by userId, response provides filtered rows.
 * @param {Object} req.query Request query.
 * @return {Object} res {status: Number, data: Array<Object>}
 */
 export async function getByUserId(req, res) {
  await Contact.findAll({
    where: {
      userId: req.query.userId,
    },
  }).then(contacts => res.status(200).json(contacts));
}

export async function getByContactId(req, res) {
  const id = getIdFromUrlParam(req);
  const contact = await Contact.findByPk(id);

  if (!contact) {
    res.status(404).send("404 - Not found");
  }

  res.status(200).json(contact);
}

/**
 * CREATE contact, response provides new row columns with (new) associated id.
 * @param {Object} req.body Request payload.
 * @param {String} req.body.userId
 * @param {String} req.body.firstName
 * @param {String} req.body.lastName
 * @param {Date} req.body.email
 * @param {String} req.body.phoneNumber
 * @return {Object} res {status: Number, data: Object}
 */
 export async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: id is determined by database and should not be provided`
      );
  }

  await Contact.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send(err.message || "An error occurred while creating new Contact.");
    });
}

/**
 * UPDATE contact, response provides number of updated rows and the updated rows themselves.
 * @param {Object} req.body Request payload.
 * @param {String} req.body.userId
 * @param {String} req.body.firstName
 * @param {String} req.body.lastName
 * @param {Date} req.body.email
 * @param {String} req.body.phoneNumber
 * @return {Object} res {status: Number, data: Array<Number, Array<Object>>}
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
  await Contact.update(req.body, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then(resultArray => res.status(200).json(resultArray))
    .catch(err => {
      res
        .status(500)
        .send(err.message || "An error occurred while updating Contact.");
    });
}

/**
 * DELETE contacts, response provides number of deleted rows
 * @param {Object} req.body Request payload.
 * @param {Array<Number>} req.body.ids
 * @return {Object} res {status: Number, data: Object}
 */
 export async function removeById(req, res) {
  const requestIds = req.body.ids;
  
  await Contact.destroy({
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
        .send(err.message || "An error occurred while removing selected Contacts.");
    });
}

export async function removeAll(req, res) {
  Contact.destroy({
    truncate: true,
  })
    .then(numRowsDeleted => {
      res.status(200).send(`${numRowsDeleted} Contacts removed successfully.`);
    })
    .catch(err => {
      res
        .status(500)
        .send(err.message || "An error occurred while removing all Contacts.");
    });
}

export default { getByUserId, getByContactId, create, update, removeById, removeAll };
