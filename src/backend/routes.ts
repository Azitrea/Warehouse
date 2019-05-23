import * as express from 'express';
import BaseCtrl from './controllers/base.controller';
import { Unit } from './entities/unit';
import UnitController from './controllers/unit.controller';
import { Parts } from './entities/parts';
import PartsController from './controllers/parts.controller';
import { CustomerOrder } from './entities/customerOrder';
import CustomerOrderController from './controllers/customerOrders.controller';
import { PartsNumbers } from './entities/parts_numbers';
import PartsNumbersController from './controllers/parts_numbers.controller';



export default function setRoutes(app) {

  const router = express.Router();

  getGeneralRoutes({
    router,
    entityName: 'units',
    entity: new Unit,
    ctrl: new UnitController
  });

  getGeneralRoutes({
    router,
    entityName: 'parts',
    entity: new Parts,
    ctrl: new PartsController
  });

  getGeneralRoutes({
    router,
    entityName: 'partNumbers',
    entity: new PartsNumbers,
    ctrl: new PartsNumbersController
  });

  getGeneralRoutes({
    router,
    entityName: 'orders',
    entity: new CustomerOrder,
    ctrl: new CustomerOrderController
  });

  app.use('/backend', router);

}
function getGeneralRoutes(routingInfo: {
  router: any,
  entity: any,
  entityName: string,
  ctrl: BaseCtrl
}) {

  const rt = routingInfo.router;
  const entityName = routingInfo.entityName;
  const ctrl = routingInfo.ctrl;
  console.log(entityName);

  rt.get(`/${entityName}/list`,   ctrl.getAll);
  rt.get(`/${entityName}/:id`,   ctrl.get);
  rt.post(`/${entityName}/add`,   ctrl.insert);
  rt.put(`/${entityName}/:id`,   ctrl.update);
  rt.delete(`/${entityName}/:id`,   ctrl.delete)
  rt.post(`/${entityName}/insertMany`, ctrl.insertMany);
  rt.post(`/${entityName}/updateMany`, ctrl.updateMany);
  rt.post(`/${entityName}/deleteMany`, ctrl.deleteMany);

}
