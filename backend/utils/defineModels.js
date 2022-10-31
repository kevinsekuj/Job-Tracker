import User from "../models/User.js";
import Company from "../models/Company.js";
import Skill from "../models/Skill.js";
import Contact from "../models/Contact.js";
import Job from "../models/Job.js";

export default function defineModels(sequelize) {
  const modelDefiners = [User, Company, Skill, Contact, Job];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
}
