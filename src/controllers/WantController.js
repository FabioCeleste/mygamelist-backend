import User from '../models/User';
import Game from '../models/Game';

class BeatController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const game = await Game.findByPk(req.params.gameId);

    await user.addWantGame(game);
    return res.json({ ok: 'ok' });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const game = await Game.findByPk(req.params.gameId);

    await user.removeWantGame(game);
    return res.json({ ok: 'ok' });
  }
}

export default new BeatController();
