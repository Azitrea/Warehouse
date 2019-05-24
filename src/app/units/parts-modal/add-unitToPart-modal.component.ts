import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-addunittopart-modal',
  templateUrl: './add-unitToPart-modal.component.html',
  styleUrls: ['./add-unitToPart-modal.component.css']
})
export class AddUnitToPartModalComponent implements OnInit {

  @Input() units = [];
  @Input() parts = [];
  @Input() listVal = [];
  @Input() selectedPart = [];

  _partAndUnitList = [];


  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this._partAndUnitList = this.units.concat(this.parts);
    this.sortAlreadyExisting();
    this.removeSelectedPart();
  }

  sortAlreadyExisting() {
    for (const listElement of this.listVal) {
      for (const i in this._partAndUnitList) {
        if (listElement['unitID'].toString() === this._partAndUnitList[i]['id'].toString() &&
          listElement['type'] === this._partAndUnitList[i]['type']) {
          this._partAndUnitList.splice(Number(i), 1);
        }
      }
    }
  }

  removeSelectedPart() {
    const index = this._partAndUnitList.indexOf(this.selectedPart);
    if (index !== -1) {
      this._partAndUnitList.splice(index, 1);
    }
  }


  close() {
    this.activeModal.close({ action: 'close' });
  }

  save(data) {
    this.activeModal.close({ action: 'save', data: data });
  }

}
