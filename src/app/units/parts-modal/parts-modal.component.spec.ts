import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsModalComponent } from './parts-modal.component';

describe('PartsModalComponent', () => {
  let component: PartsModalComponent;
  let fixture: ComponentFixture<PartsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
