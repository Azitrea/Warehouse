import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  @Input() formData = [];
  unitFormGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) { }

  ngOnInit() {
    this.unitFormGroup = this.fb.group(this.formData);
    this.unitFormGroup.patchValue({
      date: this.getDate()
    });
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
    this.activeModal.close({ action: 'save', data: this.unitFormGroup.value });
  }
}
