import { USER_SKILL } from "./constants.js";

function addAssociations(sequelize) {
  const { User, Skill, Contact } = sequelize.models;

  Skill.belongsToMany(User, { through: USER_SKILL });
  Contact.belongsTo(User, {
    onDelete: "CASCADE",
  });
}

export default addAssociations;
