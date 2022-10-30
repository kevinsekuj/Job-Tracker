import { DataTypes } from "sequelize";

const Company = sequelize => {
  sequelize.define("Company", {
    email: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      },
    },
  });
};

export default Company;
