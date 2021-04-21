'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
      Product.belongsToMany(models.User, {through: models.Cart, foreignKey: 'ProductId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'image url cannot be empty'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'category cannot be empty'
        }
      }
    },
    price: {
      type:DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          args: true,
          msg:'stock cannot be empty'
        },
        min: {
          args: [0],
          msg: "price cannot be negative"
        },
        isNumeric: {
          args: true,
          msg: 'enter a number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg:'stock cannot be empty'
        },
        min: {
          args: [0],
          msg: "stock cannot be negative"
        },
        isNumeric: {
          args: true,
          msg: 'enter a number'
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};