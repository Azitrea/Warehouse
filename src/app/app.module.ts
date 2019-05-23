import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnitsComponent } from './units/units.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { UnitsModalComponent } from './units/units-modal/units-modal.component';
import {EditModalComponent} from './units/units-modal/edit-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PickListModule} from 'primeng/picklist';
import { PartsModalComponent } from './units/parts-modal/parts-modal.component';
import {EditPartsModalComponent} from './units/parts-modal/edit-parts-modal.component';
import {AddUnitToPartModalComponent} from './units/parts-modal/add-unitToPart-modal.component';


const routes: Routes = [
  { path : 'units', component: UnitsComponent },
  { path: '', redirectTo: '/units', pathMatch: 'full'},
  { path : 'orders', component: OrdersComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    UnitsComponent,
    OrdersComponent,
    UnitsModalComponent,
    EditModalComponent,
    PartsModalComponent,
    EditPartsModalComponent,
    AddUnitToPartModalComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    PickListModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [
    UnitsModalComponent,
    EditModalComponent,
    PartsModalComponent,
    EditPartsModalComponent,
    AddUnitToPartModalComponent
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

