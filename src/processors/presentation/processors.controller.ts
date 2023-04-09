import { Controller, Get } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { GetProcessorResponseDto } from '~/processors/presentation/dto/output/get-processor.dto';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';

@Controller('processors')
@ApiTags('Processors')
@CustomApiExtraModels()
export class ProcessorsController {
  constructor(private readonly processorsRepository: ProcessorsRepository) {}

  @Get()
  @ApiDefaultResponse({ type: GetProcessorResponseDto, isArray: true })
  @AuthenticatedRoute()
  async findAll() {
    const [processors] = await this.processorsRepository.findAll();
    return GetProcessorResponseDto.factory(GetProcessorResponseDto, processors);
  }
}
