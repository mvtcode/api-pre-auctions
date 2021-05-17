import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/commons/mongo/mongo.module';
import { AuctionsModule } from './modules/auctions/auctions.module';

@Module({
  imports: [
    MongoModule,
    AuctionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
