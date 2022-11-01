import { DataTypes } from "sequelize";

const Company = sequelize => {
  sequelize.define("Company", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [1, 50],
      },
    },
  });
};

export default Company;
