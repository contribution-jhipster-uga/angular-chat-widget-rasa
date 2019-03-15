import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotRasaComponent } from './chatbot-rasa.component';

describe('ChatbotRasaComponent', () => {
  let component: ChatbotRasaComponent;
  let fixture: ComponentFixture<ChatbotRasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotRasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotRasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
