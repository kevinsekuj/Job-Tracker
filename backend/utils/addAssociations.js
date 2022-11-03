import { USER_SKILL, JOB_SKILL } from "./constants.js";

function addAssociations(sequelize) {
  const { User, Company, Skill, Contact, Job } = sequelize.models;

  // // 1:M relationship between User and Job
  // User.hasMany(Job);
  // Job.belongsTo(User, {
  //   onDelete: "CASCADE",
  // });

  // // 1:M relationship between Company and Job
  // Company.hasMany(Job);
  // Job.belongsTo(Company, {
  //   onDelete: "CASCADE",
  // });

  // 1:M relationship between Contact and Job
  Contact.hasMany(Job);
  Job.belongsTo(Contact);

  // // M:M relationship between User and Skill
  // Skill.belongsToMany(User, { through: USER_SKILL });
  // User.belongsToMany(Skill, { through: USER_SKILL });

  // M:M relationship between Job and Skill
  Skill.belongsToMany(Job, { through: JOB_SKILL });
  Job.belongsToMany(Skill, { through: JOB_SKILL });
}

export default addAssociations;
