import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder } from '@angular/forms';
import {EditPartsModalComponent} from '../units/parts-modal/edit-parts-modal.component';
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

  constructor(public rs: RestService, public fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.listOrders();
    this.listParts();
  }

  async listOrders() {
    this._serviceOrders = await this.rs.getAll('orders', {});
  }

  async listParts() {
    this._serviceParts = await this.rs.getAll('parts', {});
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
