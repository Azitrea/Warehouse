import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {Unit} from '../entities/unit';
import { Parts } from '../entities/parts';
import { CustomerOrder } from '../entities/customerOrder';

export default class UnitController extends BaseCtrl {

  model = getRepository(Unit);

  insert = async (req, res) => {
    try {
      const entity = this.model.create(req.body);
      console.log(entity);
      await this.model.save(entity);
      res.json({
        success: true,
        id: entity['id']
      });
    } catch (err) {
      return this.handleError(res);
    }
  }

}
