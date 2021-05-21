import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class QueryListReq {
  @ApiProperty({
    description: "pageIndex",
		example: 0,
    required: true,
  })
  pageIndex: string;

  @ApiProperty({
    description: "pageSize",
    example: 20,
  })
  pageSize: string;
}

export class CreateAuctionDto {
	ksm_address: string;
  ksm_number?: number;
	// erc20_address: string;
	email: string;
	referrer_code: string;
}

export class UpdateAuctionDto extends CreateAuctionDto {
}

class RequestBaseDto {
  @ApiProperty({
    description: "KSM address",
		example: "5DkdRqVZy9GESGwSWiqYumLzXkbYZ3kaxhjkyPgm7pgo5iMe",
    required: true,
  })
  @IsNotEmpty()
  ksm_address: string;

  // @ApiProperty({
  //   description: "Erc20 address",
  //   example: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
  // })
  // @IsNotEmpty()
  // erc20_address: string;

  @ApiProperty({
    description: "KSM number",
    type: Number,
    example: 123.5,
    required: false,
    default: 0,
  })
  @IsNotEmpty()
  ksm_number: number;

  @ApiProperty({
    description: "Email",
		example: "tan.mac@sotatek.com",
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Your referrer code",
		example: "WCFMLSM50BY7RMYDF3MJ",
    type: String,
  })
  @IsNotEmpty()
  your_referrer_code: string;

  @ApiProperty({
    description: "Referrer code",
		example: "ISF2GXUEH75N6XJLDM1T",
    type: String,
  })
  @IsNotEmpty()
  referrer_code: string;
}

export class CreateAuctionRequestDto extends RequestBaseDto {
  @ApiProperty({
    description: "Captcha code",
		example: "...",
    type: String,
    default: '',
  })
  @IsNotEmpty()
  captcha_code: string;
}

export class CreateAuctionResponseDto extends RequestBaseDto {
  @ApiProperty({
    description: "ID",
    example: "60a223eb00a6df001d542cfb",
    type: String,
  })
  _id: string;

  @ApiProperty({
    description: "createdAt",
    example: "2021-05-17T08:06:03.117Z",
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: "updatedAt",
    example: "2021-05-17T08:06:03.117Z",
    type: String,
  })
  updatedAt: string;
}

export class UpdateAuctionRequestDto extends RequestBaseDto {
}

export class UpdateAuctionResponseDto {
  @ApiProperty({
    description: "isOk",
    example: true,
  })
  isOk: boolean;
}

export class CountAuctionResponseDto {
  @ApiProperty({
    description: "Total recorder auction",
    example: 156734,
  })
  total: number;
}