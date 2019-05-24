import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-add-modal',
  templateUrl: './order-add-modal.component.html',
  styleUrls: ['./order-add-modal.component.css']
})
export class OrderAddModalComponent implements OnInit {

  @Input() partData = [];

  orderFormGroup = this.fb.group({
    id: null,
    customerName: ['', Validators.required],
    customerAddress: ['', Validators.required],
    orderDate: this.getDate(),
    orderedPart: ['', Validators.required],
    amount: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,  public fb: FormBuilder) { }

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
    this.activeModal.close({ action: 'save', data: this.orderFormGroup.value });
  }
}
