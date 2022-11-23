import { db } from "../utils/dbConnect.js";
import getIdFromUrlParam from "../utils/getIdFromUrlParam.js";

const { Company } = db.sequelize.models;

export async function getAll(req, res) {
  const companies = await Company.findAll();
  res.status(200).json(companies);
}

export async function getById(req, res) {
  const id = getIdFromUrlParam(req);
  const company = await Company.findByPk(id);

  if (!company) {
    res.status(404).send("404 - Not found");
  }

  res.status(200).json(company);
}

export async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID is determined by database and should not be provided.`
      );
  }

  await Company.create(req.body);
  res.status(201).end();
}

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

  await Company.update(req.body, {
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

export async function remove(req, res) {
  const id = getIdFromUrlParam(req);
  await Company.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

export async function removeAll(req, res) {
  Company.destroy({
    truncate: true,
  })
    .then(numRowsDeleted => {
      res.status(200).send(`${numRowsDeleted} Companies removed successfully.`);
    })
    .catch(err => {
      res
        .status(500)
        .send(err.message || "An error occurred while removing all Companies.");
    });
}

export default { getAll, getById, create, update, remove, removeAll };
