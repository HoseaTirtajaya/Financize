'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class financial_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user_id"
      })
      this.hasMany(models.financial_expenses, {
        foreignKey: "budget_id"
      })
    }
  }
  financial_data.init({
    amount: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'financial_data',
  });
  return financial_data;
};