import { Module } from '@nestjs/common';
import { ProcessorsController } from '~/processors/presentation/processors.controller';

@Module({
  controllers: [ProcessorsController],
})
export class ProcessorsModule {}
