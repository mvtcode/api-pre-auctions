import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsByteLength, Length, IsMongoId, IsNumberString, Matches, isEmail, IsEmail } from "class-validator";

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
    description: "Email",
		example: "tan.mac@sotatek.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Your referrer code",
		example: "6dff762a-b8c4-4d62-aa5b-5ed80e5dca95",
  })
  @IsNotEmpty()
  your_referrer_code: string;

  @ApiProperty({
    description: "Referrer code",
		example: "df76ae79-65a0-4d0e-999c-77acb6d17bbf",
  })
  @IsNotEmpty()
  referrer_code: string;
}

export class CreateAuctionRequestDto extends RequestBaseDto {
  @ApiProperty({
    description: "Captcha code",
		example: "...",
  })
  @IsNotEmpty()
  captcha_code: string;
}

export class CreateAuctionResponseDto extends RequestBaseDto {
  @ApiProperty({
    description: "ID",
    example: "60a223eb00a6df001d542cfb",
  })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    description: "createdAt",
    example: "2021-05-17T08:06:03.117Z",
  })
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({
    description: "updatedAt",
    example: "2021-05-17T08:06:03.117Z",
  })
  @IsNotEmpty()
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