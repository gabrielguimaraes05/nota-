module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('orders', 'status', {
    type: Sequelize.INTEGER,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('orders', 'status'),
};
