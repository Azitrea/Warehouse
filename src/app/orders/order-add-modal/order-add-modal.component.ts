import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {enterView} from '@angular/core/src/render3/state';

@Component({
  selector: 'app-order-add-modal',
  templateUrl: './order-add-modal.component.html',
  styleUrls: ['./order-add-modal.component.css']
})
export class OrderAddModalComponent implements OnInit {

  @Input() partData = [];
  @Input() partNumbers = [];
  @Input() units = [];
  _sortedPartData = [];

  orderFormGroup = this.fb.group({
    id: null,
    customerName: ['', Validators.required],
    customerAddress: ['', Validators.required],
    orderDate: this.getDate(),
    orderedPart: ['', Validators.required],
    amount: ['', Validators.required]
  });

  _missing = [];

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.sortPartsWithNoRecipe();
  }

  getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();

    if (Number(dd) < 10) {
      dd = '0' + dd;
    }

    if (Number(mm) < 10) {
      mm = '0' + mm;
    }

    return `${yyyy}.${mm}.${dd}`;
  }

  sortPartsWithNoRecipe() {
    for (const entity of this.partData) {
      if (this.hasRecipeAdded(entity['id'])) {
        this._sortedPartData.push(entity);
      }
    }
  }

  hasRecipeAdded(PartID) {
    const recipe = [];
    try {
      if (this.partNumbers.length !== 0) {

        for (const element of this.partNumbers) {
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

  getPartName(id) {
    try {
      for (const part of this.partData) {
        if (part['id'].toString() === id) {
          return part['name'];
        }
      }
    } catch (e) {
    }
    return `Name not found for ID: ${id}`;
  }

  calculateOrderUnits(OrderedPartID, amount) {
    const UnitsNeeded = [];
    const PartsAlreadyUsed = [];

    const onePart = {'name': this.getPartName(OrderedPartID), 'id': OrderedPartID};
    PartsAlreadyUsed.push(onePart);

    const result = this.selectPartAndUnitList(OrderedPartID, PartsAlreadyUsed, UnitsNeeded, amount);

    console.log('Result');
    console.log(result);
    return result;
  }

  selectPartAndUnitList(OrderedPartID, PartsAlreadyUsed, UnitsNeeded, amount) {
    const ID = OrderedPartID;

    let used = PartsAlreadyUsed;
    let units = UnitsNeeded;

    const filteredUnitsList = this.filterByID(ID);

    for (const one of filteredUnitsList) {

      if (one['type'] === 'unit') {
        const oneUnit = {'id': one['unitID'], 'name': one['name'], 'amount': Number(one['unitAmount'])};
        if (units.length === 0) {
          oneUnit['amount'] = oneUnit['amount'] * amount;
          units.push(oneUnit);
        } else {
          let isAdded = false;
          let index = null;
          for (const i in units) {
            if (units[i]['id'] === oneUnit['id'] && units[i]['name'] === oneUnit['name']) {
              isAdded = true;
              index = i;
            }
          }

          if (isAdded) {
            units[index]['amount'] += (oneUnit['amount'] * amount);
          } else {
            oneUnit['amount'] = oneUnit['amount'] * amount;
            units.push(oneUnit);
          }
        }
      }

      if (one['type'] === 'part') {
        const onePart = {'name': one['name'], 'id': one['unitID']};
        if (!this.containsObject(onePart, used)) {
          used.push(onePart);
          const result = this.selectPartAndUnitList(one['unitID'], used, units, (one['unitAmount'] * amount));
          if (result !== 'Error') {
            used = result['used'];
            units = result['units'];
          } else {
            return 'Error';
          }
        } else {
          return 'Error';
        }
      }
    }
    return {'units': units, 'used': used};
  }

  containsObject(obj, list) {
    for (const entity of list) {
      if (entity['name'] === obj['name'] && entity['id'] === obj['id']) {
        return true;
      }
    }
    return false;
  }

  filterByID(partID) {
    const unitList = [];
    for (const one of this.partNumbers) {
      if (one['partID'] === partID) {
        unitList.push(one);
      }
    }
    return unitList;
  }


  canInsertOrder(unitArray) {
    const requiredUnitAmount = [];
    let canInsert = true;
    console.log(unitArray['units']);
    console.log(this.units);
    for (const calcUnit of unitArray['units']) {
      for (const storedUnit of this.units) {
        console.log({'calcunitID': calcUnit['id'], 'asd': storedUnit['id']});
        if (calcUnit['id'] === storedUnit['id'].toString()) {
          console.log(`${calcUnit['amount']} > ${storedUnit['onStorage']}`);
          if (calcUnit['amount'] > storedUnit['onStorage']) {
            canInsert = false;
            const calc = calcUnit['amount'] - storedUnit['onStorage'];
            requiredUnitAmount.push({[calcUnit['name']]: calc});
          }
        }
      }
    }
    if (canInsert) {
      return {'canInsert': true};
    } else {
      return {'canInsert': false, 'missingUnits': requiredUnitAmount};
    }
  }


  close() {
    this.activeModal.close({action: 'close'});
  }

  save() {
    const calculatedUnits = this.calculateOrderUnits(this.orderFormGroup.value['orderedPart'], this.orderFormGroup.value['amount']);
    const canInsert = this.canInsertOrder(calculatedUnits);
    console.log(canInsert);
    if (canInsert['canInsert']) {
      this.activeModal.close({action: 'save', data: this.orderFormGroup.value});
    } else {
      this._missing = canInsert['missingUnits'];
      console.log(canInsert['missingUnits']);
    }
  }
}
