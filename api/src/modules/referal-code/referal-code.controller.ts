import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReferalCodeService } from './referal-code.service';
import { generateRequestDto, generateResponseDto } from './referal-code.dto';

@Controller('referal-code')
export class ReferalCodeController {
	constructor(private referalCodeService: ReferalCodeService) {}

	@ApiOperation({
    operationId: 'Generate',
    description: 'Get all list Auction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: generateResponseDto,
    description: 'Generate referal code',
  })
  @Get("generate")
  async generate(@Query() request: generateRequestDto): Promise<{code: string}> {
    return {
			code: await this.referalCodeService.generate(request.ksm_address)
		};
  }
}
