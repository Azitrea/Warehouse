import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder } from '@angular/forms';
import { UnitsModalComponent } from './units-modal/units-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from './units-modal/edit-modal.component';

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


  constructor(public rs: RestService, public fb: FormBuilder,  private modalService: NgbModal) { }

  ngOnInit() {
    this.listUnits();
    this.listParts();
    this.listPartsAndNumbers();
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

  addUnitModal() {
    const modalRef = this.modalService.open(UnitsModalComponent);

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.saveUnits(result['data']);
          break;
        case 'delete':

          break;
      }
    }, (err) => ('dismissed'));
  }

  editUnitModal(rowData) {
    console.log(rowData);
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.formData = rowData;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          console.log('update:');
          console.log(result['data']);
          this.updateUnits(result['data']);
          break;
        case 'delete':

          break;
      }
    }, (err) => ('dismissed'));
  }

  async removeUnit(data) {
    await this.remove('units', data);
    this.listUnits();
  }

  async updateUnits(data){
    await this.update('units', data);
    this.listUnits();
  }

  async saveUnits(data){
    await this.save('units', data);
    this.listUnits();
  }

  async save(objName, data) {
    await this.rs.save(objName, data);
  }

  async update(objName, data){
    await this.rs.update(objName, data);
  }

  async remove(objName, data) {
    await this.rs.delete(objName, data);
  }
 logging() {
    console.log(this._serviceUnits);
 }


}
