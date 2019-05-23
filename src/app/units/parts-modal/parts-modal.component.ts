import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-parts-modal',
  templateUrl: './parts-modal.component.html',
  styleUrls: ['./parts-modal.component.css']
})
export class PartsModalComponent implements OnInit {

  partFormGroup = this.fb.group({
    name: ['', Validators.required],
    date: this.getDate(),
    type: 'part'
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

  close() {
    this.activeModal.close({ action: 'close' });
  }

  save() {
    this.activeModal.close({ action: 'save', data: this.partFormGroup.value });
  }
}
