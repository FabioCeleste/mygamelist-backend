import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      user_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja utilizado',
        },
        validate: {
          isEmail: {
            msg: 'Email invalido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 255],
            msg: 'O campo senha deve ter entre 6 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  userIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'follower_id', as: 'following', through: 'users_follows' });
    this.belongsToMany(models.User, { foreignKey: 'following_id', as: 'follower', through: 'users_follows' });
    this.belongsToMany(models.Game, { foreignKey: 'user_id', as: 'beatGame', through: 'user_finish' });
    this.belongsToMany(models.Game, { foreignKey: 'user_id', as: 'dropGame', through: 'user_drop' });
    this.belongsToMany(models.Game, { foreignKey: 'user_id', as: 'wantGame', through: 'user_want' });
    this.belongsToMany(models.Game, { foreignKey: 'user_id', through: 'fav_games', as: 'favGame' });
  }
}
