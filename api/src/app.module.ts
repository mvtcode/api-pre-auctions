import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/commons/mongo/mongo.module';
import { AuctionsModule } from './modules/auctions/auctions.module';
import { ReferalCodeModule } from './modules/referal-code/referal-code.module';
import { RedisModule } from './modules/commons/redis/redis.module';

@Module({
  imports: [
    MongoModule,
    AuctionsModule,
    ReferalCodeModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
