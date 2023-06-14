import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RequestModulesResponseBodyDto {
  @ApiProperty({})
  @Expose()
  requestSettings: object;

  @ApiProperty({})
  @Expose()
  apiRequestBody: object;

  @ApiProperty({})
  @Expose()
  apiResponseBody: object;

  @ApiProperty({})
  @Expose()
  attempts: number;
}
