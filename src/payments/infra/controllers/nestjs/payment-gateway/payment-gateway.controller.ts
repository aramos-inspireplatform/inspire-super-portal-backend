import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUpdatePaymentGatewayCommand } from '~/payments/application/commands/contracts';
import { UpdatePaymentGatewayInputDto } from '~/payments/infra/controllers/nestjs/payment-gateway/inputs';
import { UpdatePaymentGatewayOutputDto } from '~/payments/infra/controllers/nestjs/payment-gateway/outputs';
import { PaymentSymbols } from '~/payments/infra/ioc/nestjs/payment.symbols';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';

@Controller('payment-gateways')
@ApiTags('Payment gateways')
export class PaymentGatewayController {
  constructor(
    @Inject(PaymentSymbols.UPDATE_PAYMENT_GATEWAY)
    private readonly updatePaymentGatewayCalculatorCommand: IUpdatePaymentGatewayCommand,
  ) {}

  @ApiOperation({ description: 'Update payment gateway calculator' })
  @Patch(':paymentGatewayId')
  @AuthenticatedRoute()
  @ApiDefaultResponse({
    type: UpdatePaymentGatewayOutputDto,
    status: HttpStatus.OK,
  })
  async update(
    @Param('paymentGatewayId', ParseUUIDPipe) paymentGatewayId: string,
    @Body() input: UpdatePaymentGatewayInputDto,
  ) {
    return this.updatePaymentGatewayCalculatorCommand.execute({
      ...input,
      id: paymentGatewayId,
      tenantId: input.tenantId,
    });
  }
}
