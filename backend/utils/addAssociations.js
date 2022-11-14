function addAssociations(sequelize) {
  const { Contact, Job } = sequelize.models;

  // 1:M relationship between Contact and Job
  Contact.hasMany(Job);
  Job.belongsTo(Contact);
}

export default addAssociations;
