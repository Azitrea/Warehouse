import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AddUnitToPartModalComponent} from './add-unitToPart-modal.component';
import {patchComponentDefWithScope} from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-edit-parts-modal',
  templateUrl: './edit-parts-modal.component.html',
  styleUrls: ['./edit-parts-modal.component.css']
})
export class EditPartsModalComponent implements OnInit {

  @Input() formData = [];
  @Input() partNumbers = [];
  @Input() units = [];
  @Input() parts = [];

  partFormGroup: FormGroup;
  partFormNumbers: FormGroup;

  newRecipeValues = [];
  updateRecipeValues = [];
  removeRecipeValues = [];

  currentRecipe = [];

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.partFormGroup = this.fb.group(this.formData);
    this.partFormGroup.patchValue({
      date: this.getDate()
    });

    this.recipeSelector(this.formData['id']);
    this.partFormNumbers = this.setUpForm(this.currentRecipe);
  }

  setUpForm(parts: any[] ) {
    return new FormGroup({
      parts: new FormArray(parts.map((part) => this.createPart(part)))
    });
  }

  createPart(part: any) {
    return new FormGroup({
      id: new FormControl(part.id || null),
      partID: new FormControl(this.formData['id']),
      unitID: new FormControl(part.unitID || null),
      name: new FormControl(part.name || ''),
      unitAmount: new FormControl(part.unitAmount || '0'),
      type : new FormControl(part.type || '')
    });
  }

  addNewUnit(part: any, unitID) {
    return new FormGroup({
      id: new FormControl( null),
      partID: new FormControl(this.formData['id']),
      unitID: new FormControl(unitID),
      name: new FormControl(part.name || ''),
      unitAmount: new FormControl(part.unitAmount || '0'),
      type : new FormControl(part.type || '')
    });
  }

  recipeSelector(PartID) {
    if (this.partNumbers.length !== 0) {
      for (const element of this.partNumbers) {
        if (element['partID'] === PartID.toString()) {
          this.currentRecipe.push(element);
        }
      }
    }
  }

  get partFormArray() {
    return (this.partFormNumbers.get('parts') as FormArray);
  }

  addPart() {
    const modalRef = this.modalService.open(AddUnitToPartModalComponent);
    modalRef.componentInstance.units = this.units;
    modalRef.componentInstance.parts = this.parts;

    modalRef.result.then((result) => {
      switch (result['action']) {
        case 'save':
          const newPart = result['data'];
          this.currentRecipe.push(newPart);
          this.partFormArray.push(this.addNewUnit(newPart, newPart['id']));
          break;
        case 'delete':

          break;
      }
    }, (err) => ('dismissed'));
  }

  removeArrayElement(index) {
    if (this.partFormArray.at(index).value.id === null || this.partFormArray.at(index).value.id === undefined) {
      this.partFormArray.removeAt(index);
      return;
    }

    if (this.partFormArray.at(index).value.id !== null && this.partFormArray.at(index).value.id !== undefined) {
      this.removeRecipeValues.push(this.partFormArray.at(index).value);
      this.partFormArray.removeAt(index);
      return;
    }
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
    const partsArray = this.partFormNumbers.value;
    for (const part of partsArray.parts) {
      if (part.id === null || part.id === undefined) {
        this.newRecipeValues.push(part);
      } else {
        this.updateRecipeValues.push(part);
      }
    }
    this.activeModal.close({ action: 'save', save: this.partFormGroup.value, saveData: this.newRecipeValues,
      updateData: this.updateRecipeValues, removeData: this.removeRecipeValues});
  }
}
