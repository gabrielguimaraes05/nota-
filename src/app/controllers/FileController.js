import File from '../models/File';
import Order from '../models/Order';

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

    return res.json(file);
  }

  async delete(req, res) {
    const file = await File.findOne({ where: { id: req.params.id } });

    await file.destroy();

    return res.send();
  }
}

export default new FileController();
