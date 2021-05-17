import { Test, TestingModule } from '@nestjs/testing';
import { ReferalCodeService } from './referal-code.service';

describe('ReferalCodeService', () => {
  let service: ReferalCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferalCodeService],
    }).compile();

    service = module.get<ReferalCodeService>(ReferalCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
