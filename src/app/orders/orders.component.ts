import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  _serviceOrders: string;

  constructor(public rs: RestService, public fb: FormBuilder) { }

  ngOnInit() {
    this.listOrders();
  }

  async listOrders() {
    this._serviceOrders = await this.rs.getAll('orders', {});
  }
}
