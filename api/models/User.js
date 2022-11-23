import { DataTypes } from "sequelize";

const User = sequelize => {
  sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          // 8 - 16 characters, at least one capital, one lowercase, one symbol
          is: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          // Allow alphabetical characters and hyphen, up to 50 characters
          is: /^[a-zA-Z-]{1, 50}$/,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          // Allow alphabetical characters and hyphen, up to 50 characters
          is: /^[a-zA-Z-]{1, 50}$/,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          // Supports formatted and unformatted numbers
          is: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        },
      },
    },
    {
      underscored: true,
    }
  );
};

export default User;
