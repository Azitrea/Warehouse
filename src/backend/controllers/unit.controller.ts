import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {Unit} from '../entities/unit';

export default class UnitController extends BaseCtrl {

  model = getRepository(Unit);
}
