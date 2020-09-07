import Sequelize, { Model } from 'sequelize';

export default class Reset extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER,
      },
      request_token: {
        type: Sequelize.STRING,
      },

    }, {
      sequelize,
    });

    return this;
  }
}
