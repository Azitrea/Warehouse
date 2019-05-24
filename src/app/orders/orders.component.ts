import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderAddModalComponent} from './order-add-modal/order-add-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  _serviceOrders: string;
  _serviceParts: string;
  _serviceUnits: string;
  _servicePartNumbers: string;

  constructor(public rs: RestService, public fb: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.listOrders();
    this.listParts();
    this.listUnits();
    this.listPartNumbers();
  }

  async listOrders() {
    this._serviceOrders = await this.rs.getAll('orders', {});
  }

  async listParts() {
    this._serviceParts = await this.rs.getAll('parts', {});
  }

  async listUnits() {
    this._serviceUnits = await this.rs.getAll('units', {});
  }

  async listPartNumbers() {
    this._servicePartNumbers = await this.rs.getAll('partNumbers', {});
  }

  getPartName(id) {
    try {
      for (const part of this._serviceParts) {
        if (part['id'].toString() === id) {
          return part['name'];
        }
      }
    } catch (e) {
    }
    return `Name not found for ID: ${id}`;
  }

  addOrder() {
    const modalRef = this.modalService.open(OrderAddModalComponent);
    modalRef.componentInstance.partData = this._serviceParts;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.saveOrder(result['data']);
          break;
      }
    }, (err) => ('dismissed'));
  }

  calculateOrderUnits(OrderedPartID) {
    const UnitsNeeded = [];
    const PartsAlreadyUsed = [];

    const onePart = {'name': this.getPartName(OrderedPartID), 'id': OrderedPartID};
    PartsAlreadyUsed.push(onePart);

    const result = this.selectPartAndUnitList(OrderedPartID, PartsAlreadyUsed, UnitsNeeded);

    console.log('Result');
    console.log(result);
  }

  selectPartAndUnitList(OrderedPartID, PartsAlreadyUsed, UnitsNeeded) {
    const ID = OrderedPartID;

    let error = false;

    let used = PartsAlreadyUsed;
    let units = UnitsNeeded;

    const filteredUnitsList = this.filterByID(ID);

    for (const one of filteredUnitsList) {

      if (one['type'] === 'unit') {
        const oneUnit = {'id': one['unitID'], 'name': one['name'], 'amount': Number(one['unitAmount'])};
        if (units.length === 0) {
          units.push(oneUnit);
        } else {
          let isAdded = false;
          let index = null;
          for (const i in units) {
            if (units[i]['id'] === oneUnit['id'] && units[i]['name'] === oneUnit['name']) {
              isAdded = true;
              index = i;
            }
          }

          if (isAdded) {
            units[index]['amount'] += oneUnit['amount'];
          } else {
            units.push(oneUnit);
          }
        }
      }

      if (one['type'] === 'part') {
        const onePart = {'name': one['name'], 'id': one['unitID']};
        if (!this.containsObject(onePart, used)) {
          used.push(onePart);
          const result = this.selectPartAndUnitList(one['unitID'], used, units);
          if (result !== 'Error') {
            used = result['used'];
            units = result['units'];
          } else {
            error = true;
            return 'Error';
          }
        } else {
          error = true;
          return 'Error';
        }
      }
    }
    return {'units': units, 'used': used};
  }

  containsObject(obj, list) {
    for (const entity of list) {
      if (entity['name'] === obj['name'] && entity['id'] === obj['id']) {
        return true;
      }
    }
    return false;
  }

  filterByID(partID) {
    const unitList = [];
    for (const one of this._servicePartNumbers) {
      if (one['partID'] === partID) {
        unitList.push(one);
      }
    }
    return unitList;
  }

  async saveOrder(data) {
    await this.save('orders', data);
    await this.listOrders();
  }

  async removeOrder(data) {
    await this.remove('orders', data);
    await this.listOrders();
  }

  async save(objName, data) {
    await this.rs.save(objName, data);
  }

  async update(objName, data) {
    await this.rs.update(objName, data);
  }

  async remove(objName, data) {
    await this.rs.delete(objName, data);
  }
}
