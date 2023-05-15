import { Controller, Get, Inject } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { ListPaymentCountriesUseCase } from '~/countries/application/use-case/list-payment-countries.use-case';
import { CountriesProvidersSymbols } from '~/countries/ioc/countries-providers.symbols';
import { GetPaymentCountryResponseDto } from './dto/output/payment-country-response.dto';

@Controller('payment-countries')
@ApiTags('Payment Countries')
export class PaymentCountriesController {
  constructor(
    @Inject(CountriesProvidersSymbols.LIST_PAYMENT_COUNTRIES_USE_CASE)
    private readonly listPaymentCountriesUseCase: ListPaymentCountriesUseCase,
  ) {}

  @Get()
  @ApiDefaultResponse({ type: GetPaymentCountryResponseDto, isArray: true })
  async findAll() {
    const [countries, _] = await this.listPaymentCountriesUseCase.list();
    return GetPaymentCountryResponseDto.factory(
      GetPaymentCountryResponseDto,
      countries,
    );
  }
}
