import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuctionsService } from './auctions.service';
import { CreateAuctionRequestDto, CreateAuctionResponseDto, UpdateAuctionRequestDto, UpdateAuctionResponseDto, QueryListReq, CountAuctionResponseDto } from './auctions.dto';
import { Auction } from './auctions.schema';
// import {ParseObjectIdPipe} from '../../pipes/parse-object-id.pipe';
import { isPolkadotAddress, isEmail, validateHCaptcha, isRefCode } from '../../libs/validate';

const isUseCaptcha = process.env.HCAPTCHA_ENABLE == 'true';

@ApiTags("auctions")
@Controller('auctions')
export class AuctionsController {
	constructor(private auctionsService: AuctionsService) {}

  // @ApiOperation({
  //   operationId: 'GetAll',
  //   description: 'Get all list Auction',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: [CreateAuctionResponseDto],
  //   description: 'List Auction',
  // })
  // @Get("")
  // async getList(@Query() query: QueryListReq): Promise<Auction[]> {
  //   return await this.auctionsService.getList({}, {}, parseInt(query.pageIndex), parseInt(query.pageSize));
  // }

  // @ApiOperation({
  //   operationId: 'Count',
  //   description: 'Count Auction',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: CountAuctionResponseDto,
  //   description: 'Count Auction',
  // })
	@Get("count")
  async count(): Promise<{total: number}> {
    const total = await this.auctionsService.countAll();
    return {
      total
    };
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
    const email = createDto.email;

    // validate data input
    if (!isEmail(email)) {
      throw new HttpException('Email not valid', HttpStatus.BAD_REQUEST);
    }

    if (!isRefCode(createDto.your_referrer_code)) {
      throw new HttpException('Your referrer code not valid', HttpStatus.BAD_REQUEST);
    }

    if (createDto.referrer_code && !isRefCode(createDto.referrer_code)) {
      throw new HttpException('Referrer code not valid', HttpStatus.BAD_REQUEST);
    }

    if (!isPolkadotAddress(createDto.ksm_address)) {
      throw new HttpException('KMS address not valid', HttpStatus.BAD_REQUEST);
    }

    // if (!isAddress(createDto.erc20_address)) {
    //   throw new HttpException('ERC20 address not valid', HttpStatus.BAD_REQUEST);
    // }

    // validate captcha
    if (isUseCaptcha && !await validateHCaptcha(createDto.captcha_code)) {
      throw new HttpException('Captcha is wrong', HttpStatus.BAD_REQUEST);
    }

    // validate data in db
		const count = await this.auctionsService.count({email});
		if (count > 0) {
			throw new HttpException('Email already exists', HttpStatus.CONFLICT);
		}

    const countKsmAddress = await this.auctionsService.count({ksm_address: createDto.ksm_address});
    if (countKsmAddress > 0) {
			throw new HttpException('Ksm address already exists', HttpStatus.CONFLICT);
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

    // storage data
    return await this.auctionsService.add(createDto);
  }

  // @ApiOperation({
  //   operationId: 'Update',
  //   description: 'Update Auction, id is ObjectId',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: UpdateAuctionResponseDto,
  //   description: 'Update Auction',
  // })
	// @Put(":id")
  // async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateDto: UpdateAuctionRequestDto): Promise<{isOk: boolean}> {
  //   const results = await this.auctionsService.update(id, updateDto);
  //   return {
  //     isOk: results
  //   };
  // }
}
