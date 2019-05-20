import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  backend = ['units',
    'parts',
    'partNumbers',
    'orders'
  ];

  _serviceUnits: string;
  _serviceParts: string;
  _servicePartNumbers: string;
  _serviceOrders: string;

  unitFormGroup = this.fb.group({
    name: [''],
    date: this.getDate(),
    onStorage: ['']
  });

  constructor(public rs: RestService, public fb: FormBuilder) { }

  ngOnInit() {
    this.listUnits();
    this.listParts();
    this.listPartsAndNumbers();
    this.listOrders();
  }

  getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();

    if ( Number(dd) < 10 ) {
      dd = '0' + dd;
    }

    if ( Number(mm) < 10 ) {
      mm = '0' + mm;
    }

    return `${yyyy}.${mm}.${dd}`;
  }

  async listUnits() {
    this._serviceUnits = await this.rs.getAll('units', {});
  }

  async listParts() {
    this._serviceParts = await this.rs.getAll('parts', {});
  }

  async listPartsAndNumbers() {
    this._servicePartNumbers = await this.rs.getAll('partNumbers', {});
  }

  async listOrders() {
    this._serviceOrders = await this.rs.getAll('orders', {});
  }

  async saveUnit(){
    await this.rs.save('units', this.unitFormGroup. value);
  }
  async onSubmit() {
    console.log(this.unitFormGroup. value);
    await this.rs.save('units', this.unitFormGroup. value);
  }
}
