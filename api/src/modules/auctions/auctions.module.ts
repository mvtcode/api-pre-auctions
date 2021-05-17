import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './auctions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }])
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService]
})
export class AuctionsModule {}
