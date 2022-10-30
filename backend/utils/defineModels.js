import User from "../models/User.js";
import Company from "../models/Company.js";

export default function defineModels(sequelize) {
  const modelDefiners = [User, Company];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
}
