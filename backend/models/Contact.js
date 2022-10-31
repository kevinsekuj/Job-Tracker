import { DataTypes } from "sequelize";

const Contact = sequelize => {
  sequelize.define("Contact", {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        // Supports formatted and unformatted numbers
        is: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      },
    },
  });
};

export default Contact;
