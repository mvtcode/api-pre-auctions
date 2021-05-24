import { Injectable } from '@nestjs/common';
import { randomString } from '../../libs/validate';
import { AuctionsService } from '../auctions/auctions.service';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class ReferalCodeService {
    private redis: Redis;

    constructor(
        private readonly auctionsService: AuctionsService,
        private readonly redisService: RedisService,
    ) {
        this.redis = this.redisService.getClient();
    }
    
	async generate(ksm_address: string): Promise<string> {
        let code = randomString(20);
        const cacheKey = `code-${ksm_address}`;

        if (ksm_address) {
            const dataCache = await this.redis.get(cacheKey);
            if (dataCache) return dataCache;

            const auctionInfo = await this.auctionsService.findOne({ksm_address});
            if (auctionInfo) {
                code = auctionInfo.your_referrer_code;
            }
        }

        await this.redis.set(cacheKey, code, 'EX', 3600);
        return code;
    }
}
