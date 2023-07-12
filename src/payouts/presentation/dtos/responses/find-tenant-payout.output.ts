import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { BaseDto } from '~/shared/presentation/base.dto';
export class FindTenantPayoutOutput extends BaseDto {}
