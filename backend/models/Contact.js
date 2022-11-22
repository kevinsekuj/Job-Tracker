import { DataTypes } from "sequelize";

const Contact = sequelize => {
  sequelize.define(
    "Contact",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          len: [1, 50]
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          len: [1, 50]
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
          /*
          Permitted formats:
          1234567890
          123-456-7890
          (123) 456-7890
          123 456 7890
          123.456.7890
          +91 (123) 456-7890
          */
          isInvalidPhoneNumber(number) {
            if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(number)) {
              throw new Error("Invalid phone number format.");
            }
          }
        },
      },
    },
    {
      underscored: true,
    }
  );
};

export default Contact;
