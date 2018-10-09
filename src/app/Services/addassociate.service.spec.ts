/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddassociateService } from './addassociate.service';

describe('AddassociateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddassociateService]
    });
  });

  it('should ...', inject([AddassociateService], (service: AddassociateService) => {
    expect(service).toBeTruthy();
  }));
});
