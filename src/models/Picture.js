import Sequelize, { Model } from 'sequelize';

import baseUrl from '../config/appConfig';

export default class Picture extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: ['Campo não pode ficar vazio'],
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: ['Campo não pode ficar vazio'],
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${baseUrl}/images/${this.getDataValue('filename')}`;
        },
      },

    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
