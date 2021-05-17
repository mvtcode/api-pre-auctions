import { ApiProperty } from "@nestjs/swagger";

export class generateResponseDto {
  @ApiProperty({
    description: "Response generate referal code",
    example: "6dff762a-b8c4-4d62-aa5b-5ed80e5dca95",
  })
  code: string;
}