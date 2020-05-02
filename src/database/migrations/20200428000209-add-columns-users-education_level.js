module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'education_level', {
      type: Sequelize.INTEGER,
      references: { model: 'education_level', key: 'id_education_level' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'education_level');
  },
};
