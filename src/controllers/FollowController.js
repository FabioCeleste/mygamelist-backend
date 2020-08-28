import User from '../models/User';

class FollowController {
  async store(req, res) {
    if (req.userId != req.params.targetId) {
      const targetUser = await User.findByPk(req.params.targetId);
      const user = await User.findByPk(req.userId);

      await user.addFollowing(targetUser);
      await targetUser.addFollower(user);
      return res.json({ ok: 'ok' });
    }
    return res.status(400).json({ errors: ['Voce nao pode se seguir'] });
  }

  async delete(req, res) {
    if (req.userId != req.params.targetId) {
      const targetUser = await User.findByPk(req.params.targetId);
      const user = await User.findByPk(req.userId);
      await user.addFollowing(targetUser);
      await targetUser.addFollower(user);

      await user.removeFollowing(targetUser);
      await targetUser.removeFollower(user);
      return res.json({ ok: 'ok' });
    }

    return res.status(400).json({ errors: ['Voce nao pode parar de seguir voce msm'] });
  }
}

export default new FollowController();
