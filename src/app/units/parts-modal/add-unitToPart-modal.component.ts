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
  @Input() addedList = [];

  _partAndUnitList = [];


  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this._partAndUnitList = this.units.concat(this.parts);
  }

  close() {
    this.activeModal.close({ action: 'close' });
  }

  save(data) {
    this.activeModal.close({ action: 'save', data: data });
  }

}
