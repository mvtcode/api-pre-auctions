import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { ObjectID } from 'mongodb';

@Schema()
export class Auction extends Document {
  @Prop({
    index: true,
    required: true,
    unique: true,
  })
  ksm_address: string;

  @Prop({
    index: false,
    required: false,
    default: 0,
  })
  ksm_number: Number;

	// @Prop({
  //   index: true,
  //   required: true,
  // })
  // erc20_address: string;

  @Prop({
    index: true,
    required: true,
		unique: true,
  })
  email: string;

  @Prop({
    default: null,
  })
  your_referrer_code: string;

  @Prop({
    default: null,
  })
  referrer_code: string;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
AuctionSchema.set('timestamps', true);
