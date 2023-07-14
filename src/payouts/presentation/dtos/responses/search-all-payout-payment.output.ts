import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class SearchAllPayoutPaymentOutput {
  @Expose()
  @ApiProperty({
    example: '29dcf80d-900b-430c-b3ef-705172ab68cc',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: '2023-07-14T14:06:53.574Z',
  })
  date: Date;

  @Expose()
  @ApiProperty({ example: 60 })
  amount: number;

  @Expose()
  @ApiProperty({ example: 15.708 })
  feeAmount: number;

  @Expose()
  @ApiProperty({ example: 44.292 })
  payableAmount: number;

  @Expose()
  @ApiProperty({ example: -4.642 })
  profitAmount: number;

  @Expose()
  @ApiProperty({ example: 40 })
  receivedAmount: number;
}
