import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {Parts} from '../entities/parts';

export default class PartsController extends BaseCtrl {
    model = getRepository(Parts);
}
