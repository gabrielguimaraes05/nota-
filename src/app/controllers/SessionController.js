import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import userModels from '../models/User';

class SessionControllers {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) { return res.status(401).json({ error: 'Validation fails' }); }

    const { email, password } = req.body;

    const user = await userModels.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!user.checkPassword(password)) { return res.status(401).json({ error: 'Password does not match' }); }

    const { id, name, contractor } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        contractor,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionControllers();
