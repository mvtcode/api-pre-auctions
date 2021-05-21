import { Injectable } from '@nestjs/common';
import { randomString } from '../../libs/validate';
import { AuctionsService } from '../auctions/auctions.service';

@Injectable()
export class ReferalCodeService {
    constructor(
        private readonly auctionsService: AuctionsService,
    ) {}
    
	async generate(ksm_address: string): Promise<string> {
        const auctionInfo = await this.auctionsService.findOne({ksm_address});
        if (auctionInfo) {
            return auctionInfo.your_referrer_code;
        }

        return randomString(20);
    }
}
