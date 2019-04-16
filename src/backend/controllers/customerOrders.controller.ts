import BaseCtrl from './base.controller';
import {getRepository} from 'typeorm';
import {CustomerOrder} from '../entities/customerOrder';

export default class CustormerOrderController extends BaseCtrl {
    model = getRepository(CustomerOrder);
}