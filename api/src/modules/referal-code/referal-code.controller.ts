import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReferalCodeService } from './referal-code.service';
import { generateResponseDto } from './referal-code.dto';

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
  getList(): {code: string} {
    return {
			code: this.referalCodeService.generate()
		};
  }
}
