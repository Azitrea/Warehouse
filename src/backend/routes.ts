import * as express from 'express';
import BaseCtrl from './controllers/base.controller';
import {Unit} from './entities/unit';
import UnitController from './controllers/unit.controller';

export default function setRoutes(app) {

  const router = express.Router();

  getGeneralRoutes({
    router,
    entityName: 'units',
    entity: new Unit,
    ctrl: new UnitController
  });

  app.use('/backend', router);

}
function getGeneralRoutes(routingInfo: {
  router: any,
  entity: any,
  entityName: string,
  ctrl: BaseCtrl
}) {

  console.log(routingInfo.entityName);
  const rt = routingInfo.router;
  const entity = routingInfo.entity;
  const entityName = routingInfo.entityName;
  const ctrl = routingInfo.ctrl;

  rt.get(`/${entityName}`,   ctrl.getAll);
}
