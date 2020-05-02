module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'area_interest', {
      type: Sequelize.INTEGER,
      references: { model: 'area_interest', key: 'id_area_interest' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'area_interest');
  },
};
