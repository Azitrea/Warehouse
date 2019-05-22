import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-parts-modal',
  templateUrl: './edit-parts-modal.component.html',
  styleUrls: ['./edit-parts-modal.component.css']
})
export class EditPartsModalComponent implements OnInit {

  @Input() formData = [];
  @Input() partNumbers = [];
  partFormGroup: FormGroup;
  partFormNumbers: FormGroup;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) { }

  ngOnInit() {
    this.partFormGroup = this.fb.group(this.formData);
    this.partFormGroup.patchValue({
      date: this.getDate()
    });
    this.partFormNumbers = this.fb.group(this.partNumbers);
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
