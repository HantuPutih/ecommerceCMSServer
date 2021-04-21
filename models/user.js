'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
      User.belongsToMany(models.Product, {through: models.Cart, foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: "enter a valid email"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4],
          msg: 'enter at least 6 character password'
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'enter a role'
        }
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};