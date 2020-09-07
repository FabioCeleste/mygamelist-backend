import { v1 as uuidv1 } from 'uuid';
import User from '../models/User';
import Reset from '../models/Reset';

class ResetController {
  async request(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.json({ errors: ['email nao enviado'] });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ errors: ['usuario nao encontrado'] });
    }
    const request_token = uuidv1();

    await Reset.create({ user_id: user.id, request_token });

    return res.json({ ok: request_token });
  }

  async reset(req, res) {
    const request_token = req.params.token;
    if (!request_token) {
      return res.json({ errors: ['token nao enviado'] });
    }

    const requestDb = await Reset.findOne({ where: { request_token } });
    if (!requestDb) {
      return res.json({ errors: ['token invalido'] });
    }
    const user = await User.findOne({ where: { id: requestDb.user_id } });
    if (!user) {
      return res.json({ errors: 'token invalido' });
    }
    await user.update(req.body);
    await requestDb.destroy();
    return res.json({ ok: user });
  }
}

export default new ResetController();
