// Asserts the ID provided in a request body is a valid numerical string and converts it to a number
// Adapted from https://github.com/sequelize/express-example/blob/master/express-main-example/express/helpers.js

function getIdFromUrlParam(req) {
  const id = req.body.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ID: "${id}"`);
}

export default getIdFromUrlParam;
