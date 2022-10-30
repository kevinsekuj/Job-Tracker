import User from "../models/User.js";
import Company from "../models/Company.js";
import Skill from "../models/Skill.js";

export default function defineModels(sequelize) {
  const modelDefiners = [User, Company, Skill];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
}
