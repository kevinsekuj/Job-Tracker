import User from "../models/User.js";

export default function defineModels(sequelize) {
  const modelDefiners = [User];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
}
