'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  queryInterface.addColumn('orders', 'selected_offer_id', {
    type: Sequelize.INTEGER,
    references: { model: 'offers', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'education_level'),
};
