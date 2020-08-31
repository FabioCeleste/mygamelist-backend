import User from '../models/User';
import Game from '../models/Game';

class BeatController {
  async store(req, res) {
    try {
      const error = {};
      let canAdd = true;
      const user = await User.findByPk(req.userId, {
        include: [
          { association: 'beatGame', attributes: ['id'], through: { attributes: [] } },
          { association: 'dropGame', attributes: ['id'], through: { attributes: [] } },
          { association: 'wantGame', attributes: ['id'], through: { attributes: [] } },
        ],
      });
      const game = await Game.findByPk(req.params.gameId);

      user.beatGame.map((value) => {
        if (value.dataValues.id == req.params.gameId) {
          error.errors = ['Jogo ja esta nesta lista'];
          canAdd = false;
        }
      });
      user.dropGame.map((value) => {
        if (value.dataValues.id == req.params.gameId) {
          error.errors = ['jogo ja esta na lista de dropados'];
          canAdd = false;
        }
      });
      user.wantGame.map((value) => {
        if (value.dataValues.id == req.params.gameId) {
          error.errors = ['jogo ja esta na lista de desejos'];
          canAdd = false;
        }
      });

      if (canAdd) {
        await user.addBeatGame(game);
        await game.addBeatUser(user);
      } else {
        return res.json(error);
      }

      return res.json({ ok: 'ok' });
    } catch (e) {
      return res.json({ errors: ['erro ao adicionar jogo na lista de finalizados'] });
    }
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const game = await Game.findByPk(req.params.gameId);

    await user.removeBeatGame(game);
    await game.removeBeatUser(user);
    return res.json({ ok: 'ok' });
  }
}

export default new BeatController();
