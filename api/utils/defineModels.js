import Job from "../models/Job.js";
import Contact from "../models/Contact.js";

export default function defineModels(sequelize) {
  const modelDefiners = [Job, Contact];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
}
