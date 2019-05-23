import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {PartsNumbers} from '../entities/parts_numbers';

export default class CustormerorderController extends BaseCtrl {
    model = getRepository(PartsNumbers);

  insertMany = async (req, res) => {
    console.log('InsertMany');
    try {
        const entity = this.model.create(req.body);
        console.log('body');
        console.log(req.body);
        await this.model.save(entity);
      res.json({
        success: true,
      });
    } catch (err) {
      return this.handleError(res);
    }
  }

  updateMany = async (req, res) => {
    console.log('UpdateMany');
    console.log(req.body);
    try {
      const entity = await this.model.save(req.body);
      res.json({
        success: true,
      });
    } catch (err) {
      return this.handleError(res);
    }
  }

  deleteMany = async (req, res) => {
    console.log('deleteMany');
    console.log(req.body);
    try {
      for (const ent of req.body) {
        const entity = await this.model.findOne(ent.id);
        await this.model.remove(entity);
      }
      res.json({
        success: true
      });
    } catch (err) {
      return this.handleError(res);
    }
  }
}
