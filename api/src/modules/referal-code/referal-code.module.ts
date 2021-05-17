import { Module } from '@nestjs/common';
import { ReferalCodeService } from './referal-code.service';
import { ReferalCodeController } from './referal-code.controller';

@Module({
  controllers: [ReferalCodeController],
  providers: [ReferalCodeService]
})
export class ReferalCodeModule {}
