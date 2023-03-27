import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class SignInResponseBodyDto extends BaseDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8uZmVybmFuZGVzQHNvZi50byIsImZpcnN0TmFtZSI6ImpvYW8iLCJsYXN0TmFtZSI6ImZlcm5hbmRlcyIsImlkIjoiYWI2OTA0OWItZmZlYi00ZmJhLWE2MmYtMjllNmRlYjVmYjcxIiwiaWF0IjoxNjc5ODc5MTU0LCJleHAiOjE2Nzk5NjU1NTQsImlzcyI6Imluc3BpcmVwbGF0Zm9ybS5pbyIsInN1YiI6ImFiNjkwNDliLWZmZWItNGZiYS1hNjJmLTI5ZTZkZWI1ZmI3MSJ9.IbsB90swAyGZfo6WOhnXepwPo11y16FRbmuE8nMpxUo',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8uZmVybmFuZGVzQHNvZi50byIsImZpcnN0TmFtZSI6ImpvYW8iLCJsYXN0TmFtZSI6ImZlcm5hbmRlcyIsImlkIjoiYWI2OTA0OWItZmZlYi00ZmJhLWE2MmYtMjllNmRlYjVmYjcxIiwiaWF0IjoxNjc5ODc5MTU0LCJleHAiOjE2Nzk5NjU1NTQsImlzcyI6Imluc3BpcmVwbGF0Zm9ybS5pbyIsInN1YiI6ImFiNjkwNDliLWZmZWItNGZiYS1hNjJmLTI5ZTZkZWI1ZmI3MSJ9.IbsB90swAyGZfo6WOhnXepwPo11y16FRbmuE8nMpxUo',
  })
  @Expose()
  refreshToken: string;
}
