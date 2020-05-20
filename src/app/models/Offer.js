import Sequelize, { Model } from 'sequelize';

class Offer extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DOUBLE,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

export default Offer;
