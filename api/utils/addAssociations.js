import { CONTACT_FK } from "./constants.js";

function addAssociations(sequelize) {
  const { Contact, Job } = sequelize.models;

  // 1:M relationship between Contact and Job
  Contact.hasMany(Job, {
    foreignKey: CONTACT_FK
  });
}

export default addAssociations;
