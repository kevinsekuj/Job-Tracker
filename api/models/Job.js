import { DataTypes } from "sequelize";
import { APPLICATION_STATUSES } from "../utils/constants.js";

const Job = sequelize => {
  sequelize.define(
    "Job",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 50],
        },
      },
      position: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 50],
        },
      },
      dateApplied: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isOnOrBeforeCurrentDate(date) {
            if (new Date(date) > new Date()) {
              throw new Error("Applications cannot be future-dated.");
            }
          },
        },
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      status: {
        type: DataTypes.STRING,
        isIn: [APPLICATION_STATUSES],
      },
    },
    {
      underscored: true,
    }
  );
};

export default Job;
