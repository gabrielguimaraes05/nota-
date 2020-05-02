import * as Yup from 'yup';
import User from '../models/User';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      nickname: Yup.string(),
      phone: Yup.lazy(phone => !phone ? Yup.string(): Yup.string().matches(phoneRegExp)),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(500).json({ error: 'Data validation failed' });

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ erro: 'User already exists' });
    }

    if(!req.body.nickname || !req.body.phone){
      const user = defaultnull(req.body);
      req.body.nickname = user.nickname;
      req.body.phone = user.phone;
    }

    const { name, nickname, phone ,email, contractor, area_interest , education_level } = await User.create(req.body);
    return res.json({
      name,
      nickname,
      phone,
      email,
      contractor,
      area_interest,
      education_level,

    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      nickname: Yup.string(),
      phone: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(500).json({ error: 'Data validation failed' });

    try {
      const { email, oldPassword } = req.body;
      const user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExists = await User.findOne({
          where: { email: req.body.email },
        });

        if (userExists)
          return res.status(500).json({ erro: 'User already exists' });
      }

      if (req.body.password && !(await user.checkPassword(oldPassword)))
        return res.status(500).json({ error: 'Password does not match' });

      const { id, name, nickname, phone, contractor } = await user.update(req.body);

      return res.json({
        id,
        name,
        nickname,
        phone,
        email,
        contractor,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Update user' });
    }
  }

  async index(req, res) {
    const userList = await User.findAll();

    if(userList) return res.json({ userList });

    return res.json({ message: "No registered users" });
  }
}

export default new UserController();

function defaultnull(user) {
  if(!user.nickname) user.nickname = null;
  if(!user.phone) user.phone = null;

  return user;
}
