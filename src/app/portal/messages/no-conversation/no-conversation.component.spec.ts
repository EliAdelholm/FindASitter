import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConversationComponent } from './no-conversation.component';

describe('NoConversationComponent', () => {
  let component: NoConversationComponent;
  let fixture: ComponentFixture<NoConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
