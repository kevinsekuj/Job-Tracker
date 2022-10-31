import User from "../models/User.js";
import Company from "../models/Company.js";
import Skill from "../models/Skill.js";
import Contact from "../models/Contact.js";

export default function defineModels(sequelize) {
  const modelDefiners = [User, Company, Skill, Contact];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
}
