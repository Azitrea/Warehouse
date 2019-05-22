import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder } from '@angular/forms';
import { UnitsModalComponent } from './units-modal/units-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from './units-modal/edit-modal.component';
import {PartsModalComponent} from './parts-modal/parts-modal.component';
import {EditPartsModalComponent} from './parts-modal/edit-parts-modal.component';

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

  _serviceUnits: [];
  _serviceParts: [];
  _servicePartNumbers: [];


  constructor(public rs: RestService, public fb: FormBuilder,  private modalService: NgbModal) {
    this.listPartsAndNumbers();
    this.listUnits();
    this.listParts();
  }

  ngOnInit() {
  }


  hasRecipeAdded(PartID) {
    const recipe = [];
    if (this._servicePartNumbers.length !== 0) {

      for (const element of this._servicePartNumbers) {
        if (element['partID'] === PartID.toString()) {
          recipe.push(element);
        }
      }

    }
    return recipe.length !== 0;
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
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.formData = rowData;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.updateUnits(result['data']);
          break;
        case 'delete':

          break;
      }
    }, (err) => ('dismissed'));
  }

  addPartModal() {
    const modalRef = this.modalService.open(PartsModalComponent);

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          console.log('Parts');
          console.log(result['data']);
          this.savePart(result['data']);
          break;
        case 'delete':

          break;
      }
    }, (err) => ('dismissed'));
  }

  editPartsModal(rowData) {
    const modalRef = this.modalService.open(EditPartsModalComponent);
    modalRef.componentInstance.formData = rowData;
    modalRef.componentInstance.partNumbers = this._servicePartNumbers;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.updatePart(result['data']);
          break;
        case 'delete':

          break;
      }
    }, (err) => ('dismissed'));
  }

  async removePart(data) {
    await this.remove('parts', data);
    this.listParts();
  }

  async updatePart(data) {
    await this.update('parts', data);
    this.listParts();
  }

  async savePart(data) {
    await this.save('parts', data);
    this.listParts();
  }

  async removeUnit(data) {
    await this.remove('units', data);
    this.listUnits();
  }

  async updateUnits(data) {
    await this.update('units', data);
    this.listUnits();
  }

  async saveUnits(data) {
    await this.save('units', data);
    this.listUnits();
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
 logging() {
    console.log(this._serviceUnits);
 }


}
