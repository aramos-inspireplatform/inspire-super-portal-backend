import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { IUpdatePaymentGatewayCalculatorCommand } from '~/calculator/application/commands/contracts';
import { UpdatePaymentGatewayCalculatorInputDto } from '~/calculator/infra/controllers/nestjs/payment-gateway-calculator/inputs';
import { UpdatePaymentGatewayCalculatorOutputDto } from '~/calculator/infra/controllers/nestjs/payment-gateway-calculator/outputs';
import { PaymentGatewayCalculatorSymbols } from '~/calculator/infra/ioc/nestjs/payment-gateway-calculator.symbols';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import {
  GetUserFromRequest,
  UserFromRequest,
} from '~/shared/presentation/decorators/get-user-from-request';

@Controller('payment-gateway-calculator')
@ApiTags('Payment gateway calculator')
export class PaymentGatewayCalculatorController {
  constructor(
    @Inject(PaymentGatewayCalculatorSymbols.UPDATE_PAYMENT_GATEWAY_CALCULATOR)
    private readonly updatePaymentGatewayCalculatorCommand: IUpdatePaymentGatewayCalculatorCommand,
  ) {}

  @ApiOperation({ description: 'Update payment gateway calculator' })
  @Patch()
  @AuthenticatedRoute()
  @ApiDefaultResponse({
    type: UpdatePaymentGatewayCalculatorOutputDto,
    status: HttpStatus.OK,
  })
  async update(
    @Body() input: UpdatePaymentGatewayCalculatorInputDto,
    @GetUserFromRequest() user: UserFromRequest,
    @Req() request: FastifyRequest,
  ) {
    return this.updatePaymentGatewayCalculatorCommand.execute({
      ...input,
      tenantId: user.tenantId,
      accessToken: request?.headers?.authorization as string,
    });
  }
}
