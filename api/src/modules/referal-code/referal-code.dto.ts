import { ApiProperty } from "@nestjs/swagger";

export class generateResponseDto {
  @ApiProperty({
    description: "Response generate referal code",
    example: "ISF2GXUEH75N6XJLDM1T",
    type: String,
  })
  code: string;
}

export class generateRequestDto {
  @ApiProperty({
    description: "KSM address",
    example: "ISF2GXUEH75N6XJLDM1T",
    type: String,
    required: false,
  })
  ksm_address: string;
}