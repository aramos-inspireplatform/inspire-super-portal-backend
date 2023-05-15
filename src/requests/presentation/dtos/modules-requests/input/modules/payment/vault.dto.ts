import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class VaultDto {
  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsString()
  apiSecretKey: string;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsString()
  apiAccessToken: string;
}
