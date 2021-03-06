import { Repository } from 'typeorm';

abstract class BaseCtrl {

  abstract model: Repository<any>;

  // Get all
  getAll = async (req, res) => {
    let param = {};

    const order = {
      id: 'DESC'
    };

    console.log(req.query.param);
    try {
      param = JSON.parse(req.query.param);
    } catch (e) {

    }

    if (param === '') {
      param = { order: order };
    } else {
      param['order'] = order;
    }

    const post = await this.model.find(param);
    console.log(post);

    if (!post) {
      res.status(404);
      res.end();
      return;
    }

    res.send(post);
  }

  // Insert
  insert = async (req, res) => {
    try {
      const entity = this.model.create(req.body);
      console.log(req.body);
      await this.model.save(entity);
      res.json({
        success: true,
        id: entity['id']
      });
    } catch (err) {
      return this.handleError(res);
    }
  }

  insertMany = async (req, res) => {

  }

  // Get by id
  get = async (req, res) => {
    const post = await this.model.findOne(req.params.id);

    if (!post) {
      res.status(404);
      res.end();
      return;
    }

    res.send(post);
  }

  // Update by id
  update = async (req, res) => {
    try {
      const entity = await this.model.save(req.body);
      res.json({
        success: true,
        id: entity['id']
      });
    } catch (err) {
      return this.handleError(res);
    }
  }

  updateMany = async (req, res) => {

  }

  // Delete by id
  delete = async (req, res) => {
    try {
      const entity = await this.model.findOne(req.params.id);
      await this.model.remove(entity);

      res.json({
        success: true
      });
    } catch (err) {
      return this.handleError(res);
    }
  }

  deleteMany = async (req, res) => {

  }

  handleError (res) {
    res.status(400).json({
      success: false,
      message: 'Database error occured.'
    });
  }
}

export default BaseCtrl;
