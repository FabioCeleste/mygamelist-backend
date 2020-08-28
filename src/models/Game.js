import Sequelize, { Model } from 'sequelize';

export default class Game extends Model {
  static init(sequelize) {
    super.init({
      game_name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'game_id', as: 'beatUser', through: 'user_finish' });
  }
}
