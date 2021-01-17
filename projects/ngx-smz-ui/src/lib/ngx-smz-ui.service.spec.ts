import { TestBed } from '@angular/core/testing';

import { NgxSmzUiService } from './ngx-smz-ui.service';

describe('NgxSmzUiService', () => {
  let service: NgxSmzUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSmzUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
