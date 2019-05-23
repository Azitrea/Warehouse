import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {Unit} from '../entities/unit';
import { Parts } from '../entities/parts';
import { CustomerOrder } from '../entities/customerOrder';

export default class UnitController extends BaseCtrl {
  model = getRepository(Unit);
}
