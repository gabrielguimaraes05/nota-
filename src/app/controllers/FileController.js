import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, key: path, size, location: url = "" } = req.file;

    const file = await File.create({
      name,
      path,
      size,
      url
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
