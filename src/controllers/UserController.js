import Sequelize from 'sequelize';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { email, user_name } = newUser;
      return res.json({ email, user_name });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'user_name', 'email'] });
      return res.json(users);
    } catch (e) {
      return console.log(e);
    }
  }

  async show(req, res) {
    try {
      const paramId = req.params.id;
      if (!paramId) {
        return res.status(404).json({ errors: ['Id invalido'] });
      }
      const user = await User.findByPk(paramId, {
        include: [{ association: 'following', attributes: ['id', 'user_name', 'email'], through: { attributes: [] } },
          { association: 'follower', attributes: ['id', 'user_name', 'email'], through: { attributes: [] } },
          { association: 'beatGame', attributes: ['id', 'game_name'], through: { attributes: [] } },
          { association: 'dropGame', attributes: ['id', 'game_name'], through: { attributes: [] } },
          { association: 'wantGame', attributes: ['id', 'game_name'], through: { attributes: [] } },
          { association: 'favGame', attributes: ['id', 'game_name'], through: { attributes: [] } },
          { association: 'pictures', attributes: ['filename', 'originalname', 'url'] },
        ],

        attributes: ['user_name', 'id', 'email'],
      });
      if (!user) {
        return res.status(404).json({ errors: ['Usuario não encontrado'] });
      }
      return res.json(user);
    } catch (e) {
      return console.log(e);
    }
  }

  async update(req, res) {
    try {
      const tokenId = req.userId;
      if (!tokenId) {
        return res.status(404).json({ errors: ['Id invalido'] });
      }
      const user = await User.findByPk(tokenId);
      if (!user) {
        return res.status(404).json({ errors: ['Usuario não encontrado'] });
      }
      const newDate = await user.update(req.body);
      return res.json(newDate);
    } catch (e) {
      return console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      if (!id) {
        return res.status(404).json({ errors: ['Id invalido'] });
      }
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuario não encontrado'] });
      }
      await user.destroy();
      return res.json({ Deletado: true });
    } catch (e) {
      return console.log(e);
    }
  }

  async search(req, res) {
    const { letter } = req.params;

    const users = await User.findAll({
      where: {
        user_name: {
          [Sequelize.Op.iLike]: `${letter}%`,
        },
      },
      order: [['user_name', 'DESC']],
    });

    res.json(users);
  }
}

export default new UserController();
