import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        subject: Sequelize.STRING,
        description: Sequelize.STRING,
        education_level: Sequelize.INTEGER,
        study_area: Sequelize.INTEGER,
        due_date: Sequelize.DATE,
        status: Sequelize.INTEGER,
        name_user: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Offer, { foreignKey: 'selected_offer_id', as: 'selected_offer' });
  }
}

export default Order;
