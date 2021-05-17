import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_API_URI, {
        connectionName: process.env.DB_API_NAME,
        autoIndex: false
      }
    ),

    MongooseModule.forRoot( process.env.DB_LOG_URI,  {
        connectionName: process.env.DB_LOG_NAME,
        autoIndex: false
      }
    ),

    // MongooseModule.forRoot(
    //   `mongodb://${process.env.DB_HOST}/${process.env.DB_TRANSACTION_NAME}`,
    //   {
    //     connectionName: process.env.DB_TRANSACTION_NAME,
    //     autoIndex: false
    //   }
    // ),
  ]
})
export class MongoModule {

}
