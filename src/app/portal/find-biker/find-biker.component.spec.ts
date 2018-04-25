import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBikerComponent } from './find-biker.component';

describe('FindBikerComponent', () => {
  let component: FindBikerComponent;
  let fixture: ComponentFixture<FindBikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
