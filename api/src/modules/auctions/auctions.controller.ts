import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuctionsService } from './auctions.service';
import { CreateAuctionRequestDto, CreateAuctionResponseDto, UpdateAuctionRequestDto, UpdateAuctionResponseDto, QueryListReq, CountAuctionResponseDto } from './auctions.dto';
import { Auction } from './auctions.schema';
import {ParseObjectIdPipe} from '../../pipes/parse-object-id.pipe';

@ApiTags("auctions")
@Controller('auctions')
export class AuctionsController {
	constructor(private auctionsService: AuctionsService) {}

  @ApiOperation({
    operationId: 'GetAll',
    description: 'Get all list Auction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CreateAuctionResponseDto],
    description: 'List Auction',
  })
  @Get("")
  async getList(@Query() query: QueryListReq): Promise<Auction[]> {
    return await this.auctionsService.getList({}, {}, parseInt(query.pageIndex), parseInt(query.pageSize));
  }

  @ApiOperation({
    operationId: 'Count',
    description: 'Count Auction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CountAuctionResponseDto,
    description: 'Count Auction',
  })
	@Get("count")
  async count(): Promise<{total: number}> {
    const total = await this.auctionsService.count({});
    return {
      total
    };
  }

  @ApiOperation({
    operationId: 'GetDetail',
    description: 'Get detail Auction, id is ObjectId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateAuctionResponseDto,
    description: 'Detail Auction',
  })
	@Get(":id")
  async detail(@Param('id', ParseObjectIdPipe) id: string): Promise<Auction> {
    return await this.auctionsService.findOne({ _id: id });
  }

  @ApiBody({
    type: CreateAuctionRequestDto,
  })
  @ApiOperation({
    operationId: 'CreateAuction',
    description: 'Create a Auction record in our DB',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateAuctionResponseDto,
    description: 'RoyaltyPlan created',
  })
	@Post("")
  async add(@Body() createDto: CreateAuctionRequestDto): Promise<Auction> {
		const count = await this.auctionsService.count({email: createDto.email});
		if (count > 0) {
			throw new HttpException('Email already exists', HttpStatus.CONFLICT);
		}

    const yourReferrerCodeCount = await this.auctionsService.count({
      your_referrer_code: createDto.your_referrer_code
    });
    if (yourReferrerCodeCount > 0) {
			throw new HttpException('Your referrer code already exists', HttpStatus.CONFLICT);
		}

    if (createDto.referrer_code) {
      const referrerCodeCount = await this.auctionsService.count({
        your_referrer_code: createDto.referrer_code
      });
      if (referrerCodeCount === 0) {
        throw new HttpException('Referrer code is not exist', HttpStatus.BAD_REQUEST);
      }
    }

    return await this.auctionsService.add(createDto);
  }

  @ApiOperation({
    operationId: 'Update',
    description: 'Update Auction, id is ObjectId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateAuctionResponseDto,
    description: 'Update Auction',
  })
	@Put(":id")
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateDto: UpdateAuctionRequestDto): Promise<{isOk: boolean}> {
    const results = await this.auctionsService.update(id, updateDto);
    return {
      isOk: results
    };
  }
}
