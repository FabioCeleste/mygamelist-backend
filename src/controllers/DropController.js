import User from '../models/User';
import Game from '../models/Game';

class BeatController {
  async store(req, res) {
    try {
      const error = {};
      let canAdd = true;
      const game = await Game.findByPk(req.params.gameId);
      const user = await User.findByPk(req.userId, {
        include: [
          { association: 'beatGame', attributes: ['id'], through: { attributes: [] } },
          { association: 'dropGame', attributes: ['id'], through: { attributes: [] } },
          { association: 'wantGame', attributes: ['id'], through: { attributes: [] } },
        ],
      });

      user.beatGame.map((value) => {
        if (value.dataValues.id == req.params.gameId) {
          error.errors = ['Jogo ja esta na lista de finalizados'];
          canAdd = false;
        }
      });
      user.dropGame.map((value) => {
        if (value.dataValues.id == req.params.gameId) {
          error.errors = ['jogo ja esta nesta lista'];
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
        await user.addDropGame(game);
      } else {
        return res.json(error);
      }

      return res.json({ ok: 'ok' });
    } catch (e) {
      return res.json({ errors: ['erro ao adicionar o jogo na lista de dropados'] });
    }
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const game = await Game.findByPk(req.params.gameId);

    await user.removeDropGame(game);
    return res.json({ ok: 'ok' });
  }
}

export default new BeatController();
