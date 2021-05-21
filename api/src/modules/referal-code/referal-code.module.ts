import { forwardRef, Module } from '@nestjs/common';
import { ReferalCodeService } from './referal-code.service';
import { ReferalCodeController } from './referal-code.controller';
import { AuctionsModule } from '../auctions/auctions.module';
// import { AuctionsService } from '../auctions/auctions.service';

@Module({
  imports: [AuctionsModule],
  controllers: [ReferalCodeController],
  providers: [ReferalCodeService],
})
export class ReferalCodeModule {}
