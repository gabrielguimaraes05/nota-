module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('orders', 'name_user', {
    type: Sequelize.STRING,
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('orders', 'name_user'),
};
