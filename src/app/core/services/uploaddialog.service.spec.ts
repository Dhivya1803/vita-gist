import { TestBed } from '@angular/core/testing';

import { UploaddialogService } from './uploaddialog.service';

describe('UploaddialogService', () => {
  let service: UploaddialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploaddialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
