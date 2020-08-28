module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_drop', {
      id: {
        type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'users', key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'users', key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_drop');
  },
};
