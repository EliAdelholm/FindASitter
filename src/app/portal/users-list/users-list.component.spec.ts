import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabiesListComponent } from './babies-list.component';

describe('BabiesListComponent', () => {
  let component: BabiesListComponent;
  let fixture: ComponentFixture<BabiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
