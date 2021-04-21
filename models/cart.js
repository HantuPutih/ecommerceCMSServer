'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Invalid quantity'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};