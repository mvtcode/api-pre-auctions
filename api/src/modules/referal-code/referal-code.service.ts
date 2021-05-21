import { Injectable } from '@nestjs/common';
import { randomString } from '../../libs/validate';

@Injectable()
export class ReferalCodeService {
	generate(): string {
        return randomString(20);
    }
}
