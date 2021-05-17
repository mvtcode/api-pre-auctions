import { Test, TestingModule } from '@nestjs/testing';
import { ReferalCodeController } from './referal-code.controller';

describe('ReferalCodeController', () => {
  let controller: ReferalCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferalCodeController],
    }).compile();

    controller = module.get<ReferalCodeController>(ReferalCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
