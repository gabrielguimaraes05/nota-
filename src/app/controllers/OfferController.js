import * as Yup from 'yup';
import User from '../models/User';
import Offer from '../models/Offer';

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
}

export default new OfferController();
