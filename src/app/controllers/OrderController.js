/* eslint-disable no-use-before-define */
// import { Op } from 'sequelize';
import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      subject: Yup.string().required(),
      description: Yup.string().required(),
      educationLevel: Yup.number().required(),
      studyArea: Yup.number().required(),
      dueDate: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) { return res.status(400).json({ error: 'Data validation failed' }); }

    const { userId } = req;

    const {
      subject, description, educationLevel, studyArea, dueDate,
    } = req.body;

    if (!isValidDate(dueDate)) { return res.status(400).json({ error: 'Due date is invalid' }); }

    const due_date = Date.parse(dueDate);

    const order = await Order.create({
      subject,
      description,
      education_level: educationLevel,
      study_area: studyArea,
      due_date,
      user_id: userId,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      subject: Yup.string(),
      description: Yup.string(),
      educationLevel: Yup.number(),
      studyArea: Yup.number(),
      dueDate: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed' });
    }

    if (!isValidDate(req.body.dueDate)) {
      return res.status(400).json({ error: 'Due date is invalid' });
    }

    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const { userId } = req;

    if (order.user_id !== userId) {
      return res.status(401).json({ error: 'Request unauthorized' });
    }

    const {
      subject, description, educationLevel, studyArea, dueDate,
    } = req.body;

    const ret = await order.update({
      subject,
      description,
      education_level: educationLevel,
      study_area: studyArea,
      due_date: dueDate,
    });

    return res.json({
      id: ret.id,
      subject: ret.subject,
      description: ret.description,
      educationLevel: ret.education_level,
      studyArea: ret.study_area,
      dueDate: ret.due_date,
      userId: ret.user_id,
    });
  }

  async delete(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const { userId } = req;

    if (order.user_id !== userId) {
      return res.status(401).json({ error: 'Request unauthorized' });
    }

    await order.destroy();
    return res.send();
  }

  async index(req, res) {
    const { userId } = req.params;

    const orders = (await Order.findAll({
      where: { user_id: userId },
    }));

    return res.send(orders); // usuario logado
  }

  /* async show(req, res) {
    const { query } = req;
    /* const orders = await Order.findAll({
      where: {
        [Op.and] : [
          { req.query.}
        ]
      }
    })
    return res.json(query);
  } */
}

export default new OrderController();


function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}
