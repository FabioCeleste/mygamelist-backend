import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      if (!email || !password) {
        return res.status(401).json({ errors: ['Senha ou email invalido'] });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.json(404).json({ errors: ['Usuario não encotrado '] });
      }
      const { id } = user;
      if (await user.userIsValid(password)) {
        const token = jwt.sign({ id, email }, process.env.TKSECRET, { expiresIn: process.env.TKEXP });
        return res.json({ token });
      }
      return res.status(401).json({ errors: ['Senha ou email invalido'] });
    } catch (e) {
      return console.log(e);
    }
  }
}

export default new TokenController();
