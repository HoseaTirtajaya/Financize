'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class financial_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{
        foreignKey: "dt_user"
      })
    }
  }
  financial_tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'financial_tags',
  });
  return financial_tags;
};