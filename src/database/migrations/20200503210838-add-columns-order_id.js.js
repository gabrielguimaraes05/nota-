module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('files', 'order_id', {
    type: Sequelize.INTEGER,
    references: { model: 'orders', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('users', 'education_level'),
};
