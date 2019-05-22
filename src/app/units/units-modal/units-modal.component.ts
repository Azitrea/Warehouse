import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-units-modal',
  templateUrl: './units-modal.component.html',
  styleUrls: ['./units-modal.component.css']
})
export class UnitsModalComponent implements OnInit {

  unitFormGroup = this.fb.group({
    name: ['', Validators.required],
    date: this.getDate(),
    onStorage: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) { }

  ngOnInit() {
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

  get name() {
    return this.unitFormGroup.get('name');
  }

  get amount() {
    return this.unitFormGroup.get('amount');
  }

  close() {
    this.activeModal.close({ action: 'close' });
  }

  save() {
    this.activeModal.close({ action: 'save', data: this.unitFormGroup.value });
  }
}
