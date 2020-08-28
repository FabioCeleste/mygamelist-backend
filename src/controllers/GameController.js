import Sequelize from 'sequelize';

import Game from '../models/Game';

class GameController {
  async index(req, res) {
    const { letter } = req.params;
    console.log(letter);
    const games = await Game.findAll({
      where: {
        game_name: {
          [Sequelize.Op.iLike]: `${letter}%`,
        },
      },
    });
    res.json(games);
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
