import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  _service: string;
  unitFormGroup = this.fb.group({
    name: [''],
    date: new Date(),
    onStorage: ['']
  });

  constructor(public rs: RestService, public fb: FormBuilder) { }

  ngOnInit() {
    this.listUnits();
  }

  async listUnits() {
    this._service = await this.rs.getAll({});
  }

  onSubmit() {
    console.log(this.unitFormGroup. value);
  }
}
