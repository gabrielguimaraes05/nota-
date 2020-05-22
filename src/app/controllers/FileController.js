import File from '../models/File';
import Order from '../models/Order';
import User from '../models/User';

class FileController {
  async store(req, res) {
    const {
      originalname: name, key: path, size, location: url = '',
    } = req.file;

    let orderId = null;

    if (req.body.orderId) {
      orderId = req.body.orderId;
      const order = await Order.findOne({ where: { id: orderId } });

      if (!order) {
        return res.status(400).json({ error: 'Order does not exists' });
      }
    }

    const file = await File.create({
      name,
      path,
      size,
      url,
      orderId,
    });

    if (!file.order_id) {
      const user = await User.findByPk(req.userId);
      await user.update({ avatar_id: file.id });
    }

    return res.json(file);
  }

  async delete(req, res) {
    const file = await File.findOne({ where: { id: req.params.id } });

    const user = await User.findOne({ where: { avatar_id: req.params.id } });

    if (user) await user.update({ avatar_id: null });

    await file.destroy();

    return res.send();
  }

  async index(req, res) {
    const file = await File.findOne({ where: { id: req.params.id } });
    if (file) return res.json(file);

    return res.status(400).json({ rror: 'File does not exists' });
  }
}

export default new FileController();
