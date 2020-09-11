import User from '../models/User';
import Game from '../models/Game';

class BeatController {
  async store(req, res) {
    const user = await User.findByPk(req.userId, { include: { association: 'favGame', through: { attributes: [] } } });
    const game = await Game.findByPk(req.params.gameId);
    if (user.favGame.length > 2) {
      return res.json({ errors: ['Voce ja tem 3 jogos na sua lista de favoritos'] });
    }
    await user.addFavGame(game);
    return res.json({ ok: 'ok' });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const game = await Game.findByPk(req.params.gameId);

    await user.removeFavGame(game);
    return res.json({ ok: 'ok' });
  }
}

export default new BeatController();
