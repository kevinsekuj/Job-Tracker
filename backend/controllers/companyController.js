import Company from "../models/Company.js";
import getIdFromBodyParam from "../utils/getIdFromBodyParam.js";

export async function getAll(req, res) {
  const companies = await Company.findAll();
  res.status(200).json(companies);
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
  const id = getIdFromBodyParam(req);

  await Company.update(req.body, {
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

export async function del(req, res) {
  const id = getIdFromBodyParam(req);
  await Company.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

export default { getAll, create, update, del };
