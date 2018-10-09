/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SkillService } from '../Services/skills.service';

describe('SkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillService]
    });
  });

  it('should ...', inject([SkillService], (service: SkillService) => {
    expect(service).toBeTruthy();
  }));
});
