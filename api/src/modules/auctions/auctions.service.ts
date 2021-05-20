import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { Auction } from './auctions.schema';
import { CreateAuctionDto, UpdateAuctionDto } from './auctions.dto';
import { RedisService } from 'nestjs-redis';

const REGISTERED_ADD = parseInt(process.env.REGISTERED_ADD || '0');

@Injectable()
export class AuctionsService {
	constructor(
    @InjectModel(Auction.name) private auctionModel: Model<Auction>,
		private readonly redisService: RedisService,
  ) {}

	async getAll(): Promise<Auction[]> {
    return await this.auctionModel.find();
  }

	async findOne(where: any): Promise<Auction> {
    return await this.auctionModel.findOne(where);
  }

	async countAll(): Promise<number> {
		const cacheKey = 'test';
		const redis = this.redisService.getClient();

		const dataCache = await redis.get(cacheKey);
		if (dataCache) {
			return parseInt(dataCache);
		}

		const count = await this.auctionModel.count({}) + REGISTERED_ADD;
    await redis.set(cacheKey, count, 'EX', 30);
		return count;
  }

	async count(where: any): Promise<number> {
    return await this.auctionModel.count(where);
  }

	async getList(where: any, sort: any, pageIndex: number = 0, pageSize: number = 20): Promise<Auction[]> {
		
    const query = this.auctionModel.find(where);
		
		if (sort && Object.keys(sort).length > 0) {
			query.sort(sort);
		}

		query.skip(pageIndex * pageSize);
		query.limit(pageSize);

		return await query.exec();
  }

	async add(auction: CreateAuctionDto): Promise<Auction> {
		const _auction = new this.auctionModel(auction);
		return await _auction.save();
	}

	async update(_id: string, auction: UpdateAuctionDto): Promise<boolean> {
		const results = await this.auctionModel.updateOne({
			_id: new ObjectId(_id)
		}, {
			$set: auction
		});

		return results.n > 0;
	}

	async remove(_id: string): Promise<boolean> {
		const results = await this.auctionModel.deleteOne({
			_id: new ObjectId(_id)
		});

		return results.n > 0;
	}
}
