import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsModalComponent } from './units-modal.component';

describe('UnitsModalComponent', () => {
  let component: UnitsModalComponent;
  let fixture: ComponentFixture<UnitsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
