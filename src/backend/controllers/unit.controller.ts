import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {Unit} from '../entities/unit';
import { Parts } from '../entities/parts';
import { CustomerOrder } from '../entities/customerOrder';

export default class UnitController extends BaseCtrl {

  model = getRepository(Unit);

  insert = async (req, res) => {
    const entity = await this.model.find();

    for (const i of entity) {
      if (i.name === req.body.name) {
        res.send('This unit already exists');
      }
    }

    const newEntity = this.model.create(req.body);
    await this.model.save(newEntity);
    res.send({ id: newEntity['id'] });
  }
}
