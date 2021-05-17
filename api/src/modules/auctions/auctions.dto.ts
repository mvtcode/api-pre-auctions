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
	erc20_address: string;
	email: string;
	referrer_code: string;
}

export class UpdateAuctionDto extends CreateAuctionDto {
}

export class CreateAuctionRequestDto {
  @ApiProperty({
    description: "KSM address",
		example: "0x449F4d71ea0acd1886e8F6EBeAAbbCe2514393ad",
    required: true,
  })
  @IsNotEmpty()
  ksm_address: string;

  @ApiProperty({
    description: "erc20 address",
    example: "FnWdLnFhRuphztWJJLoNV4zc18dBsjpaAMboPLhLdL7zZp3",
  })
  @IsNotEmpty()
  erc20_address: string;

  @ApiProperty({
    description: "email",
		example: "tan.mac@sotatek.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "referrer code",
		example: "ABC25256",
  })
  @IsNotEmpty()
  referrer_code: string;
}

export class CreateAuctionResponseDto {
  @ApiProperty({
    description: "ID",
    example: "60a223eb00a6df001d542cfb",
  })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    description: "KSM address",
    example: "0x449F4d71ea0acd1886e8F6EBeAAbbCe2514393ad",
  })
  @IsNotEmpty()
  ksm_address: string;

  @ApiProperty({
    description: "erc20 address",
    example: "FnWdLnFhRuphztWJJLoNV4zc18dBsjpaAMboPLhLdL7zZp3",
  })
  @IsNotEmpty()
  erc20_address: string;

  @ApiProperty({
    description: "email",
    example: "tan.mac@sotatek.com",
  })
  email: string;

  @ApiProperty({
    description: "referrer code",
    example: "ABC25256",
  })
  @IsNotEmpty()
  referrer_code: string;

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

export class UpdateAuctionRequestDto extends CreateAuctionRequestDto {
}

export class UpdateAuctionResponseDto {
  @ApiProperty({
    description: "isOk",
    example: true,
  })
  @IsNotEmpty()
  isOk: boolean
}