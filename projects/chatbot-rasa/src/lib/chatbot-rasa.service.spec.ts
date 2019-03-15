import { TestBed } from '@angular/core/testing';

import { ChatbotRasaService } from './chatbot-rasa.service';

describe('ChatbotRasaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatbotRasaService = TestBed.get(ChatbotRasaService);
    expect(service).toBeTruthy();
  });
});
