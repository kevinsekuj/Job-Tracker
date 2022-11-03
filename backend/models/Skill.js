import { DataTypes } from "sequelize";

const Skill = sequelize => {
  sequelize.define(
    "Skill",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [1, 50],
        },
      },
    },
    {
      underscored: true,
    }
  );
};

export default Skill;
