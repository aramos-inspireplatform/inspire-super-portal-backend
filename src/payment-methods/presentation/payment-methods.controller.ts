import { Controller, Get } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { GetPaymentProcessorResponseDto } from '~/payment-methods/presentation/dto/output/get-payment-processor.dto';
import { PaymentMethodsRepository } from '~/shared/infra/database/repositories/payment-methods.repository';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';

@Controller('payment-methods')
@ApiTags('Payment Methods')
@CustomApiExtraModels()
export class PaymentMethodsController {
  constructor(
    private readonly paymentMethodsRepository: PaymentMethodsRepository,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetPaymentProcessorResponseDto, isArray: true })
  async findAll() {
    const [processors] = await this.paymentMethodsRepository.findAll();
    return GetPaymentProcessorResponseDto.factory(
      GetPaymentProcessorResponseDto,
      processors,
    );
  }
}
