module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_follows', {
      id: {
        type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
      },
      following_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'users', key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      follower_id: {
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
    await queryInterface.dropTable('users_follows');
  },
};
