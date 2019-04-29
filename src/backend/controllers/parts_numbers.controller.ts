import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {PartsNumbers} from '../entities/parts_numbers';

export default class CustormerorderController extends BaseCtrl {
    model = getRepository(PartsNumbers);
}
