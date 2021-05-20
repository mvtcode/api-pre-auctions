import { Module } from '@nestjs/common';
import { RedisModule as CacheModule } from 'nestjs-redis';

@Module({
	imports: [
		CacheModule.register({
			url: process.env.REDIS_URI,
		}),
	]
})
export class RedisModule {}
