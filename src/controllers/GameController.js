import Sequelize from 'sequelize';

import Game from '../models/Game';

import paginated from '../middlewares/paginated';

class GameController {
  async index(req, res) {
    const { letter } = req.params;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const games = await Game.findAll({
      where: {
        game_name: {
          [Sequelize.Op.iLike]: `${letter}%`,
        },
      },
    });

    const results = paginated(games, page, limit);

    res.json(results);
  }

  async show(req, res) {
    const game = await Game.findByPk(req.params.gameId,
      {
        include: {
          association: 'beatUser', attributes: ['id', 'user_name'], through: { attributes: [] },
        },
        attributes: ['id', 'game_name'],
      });
    return res.json(game);
  }
}

export default new GameController();
