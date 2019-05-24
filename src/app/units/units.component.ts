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
    try {
      if (this._servicePartNumbers.length !== 0) {

        for (const element of this._servicePartNumbers) {
          if (element['partID'] === PartID.toString()) {
            recipe.push(element);
          }
        }
      }
    } catch (e) {
      console.log(e);
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
      }
    }, (err) => ('dismissed'));
  }

  editUnitModal(rowData) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.selectedPart = rowData;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          this.updateUnits(result['data']);
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
      }
    }, (err) => ('dismissed'));
  }

  editPartsModal(rowData) {
    const modalRef = this.modalService.open(EditPartsModalComponent);
    modalRef.componentInstance.selectedPart = rowData;
    modalRef.componentInstance.partNumbers = this._servicePartNumbers;
    modalRef.componentInstance.units = this._serviceUnits;
    modalRef.componentInstance.parts = this._serviceParts;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          console.log('SaveName');
          console.log(result['save']);
          this.updatePart(result['save']);

          console.log('Save');
          console.log(result['saveData']);
          this.savePartNumber(result['saveData']);

          console.log('Update');
          console.log(result['updateData']);
          this.updatePartNumber(result['updateData']);

          console.log('Remove');
          console.log(result['removeData']);
          this.removePartNumbers(result['removeData']);
          break;
      }
    }, (err) => ('dismissed'));
  }

  async savePartNumber(data) {
    await this.saveMany('partNumbers', data);
    await this.listPartsAndNumbers();
  }

  async updatePartNumber(data) {
    await this.updateMany('partNumbers', data);
    await this.listPartsAndNumbers();
  }

  async removePartNumbers(data) {
    await this.removeMany('partNumbers', data);
    await this.listPartsAndNumbers();
  }

  async removePart(data) {
    if (this.hasRecipeAdded(data['id'])) {
      const removeArray = [];
      for (const unit of this._servicePartNumbers) {
        if (unit['partID'] === data['id'].toString()) {
          removeArray.push(unit);
        }
      }
      await this.removePartNumbers(removeArray);
    }
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

  async saveMany(objName, data) {
    await this.rs.saveMany(objName, data);
  }

  async updateMany(objName, data) {
    await this.rs.updateMany(objName, data);
  }

  async removeMany(objName, data) {
    await this.rs.deleteMany(objName, data);
  }
}
