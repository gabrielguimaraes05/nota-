import * as Yup from 'yup';
import Sequelize from 'sequelize';
import User from '../models/User';
import Offer from '../models/Offer';
import Order from '../models/Order';

class OfferController {
  async store(req, res) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      description: Yup.string(),
      orderId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) return res.status(400).json({ error: 'Data validation failed' });

    const { contractor } = await User.findByPk(req.userId);

    if (contractor) return res.status(401).json({ error: 'Request unauthorized' });

    const { value, description, orderId: order_id } = req.body;

    const offer = await Offer.create({
      value,
      description,
      order_id,
      provider_id: req.userId,
    });

    return res.json(offer);
  }

  async index(req, res) {
    let offers;
    const { contractor } = await User.findByPk(req.userId);
    const { orderId: order_id } = req.params;

    if (contractor) {
      const { user_id } = await Order.findByPk(order_id);

      if (user_id !== req.userId) return res.status(401).json({ error: 'Request unauthorized' });

      offers = (await Offer.findAll({
        attributes:{
          exclude: ['provider_id'],
        },
        include: [{
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
        },],
        where: { order_id },
      }));
      return res.json({ offers });
    }

    offers = await Offer.findAll({
      where: Sequelize.and(
        { order_id: [req.params.orderId] },
        { provider_id: [req.userId] },
      ),
    });

    return res.json({ offers });  }
}

export default new OfferController();
