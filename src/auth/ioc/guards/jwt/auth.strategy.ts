import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import jwtDecode from 'jwt-decode';

import { Strategy } from 'passport-custom';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { DecodedToken } from '~/auth/ioc/guards/jwt/types/decoded-token.type';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'tenant-auth') {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async validate(context): Promise<DecodedToken> {
    if (!context?.headers?.authorization) throw new UnauthorizedException();

    try {
      const decodedCustomToken = jwtDecode<{ tenant_id: string; claims: any }>(
        context.headers.authorization.replace('Bearer ', ''),
      );

      const tenant$ = this.httpService.post(
        `${process.env.TENANT_URL}/auth/validate-token`,
        '',
        {
          headers: {
            tenant: decodedCustomToken.tenant_id,
            Authorization: context.headers.authorization ?? '',
          },
        },
      );

      const {
        data: {
          body: { data },
        },
      } = await firstValueFrom(tenant$);

      return {
        id: data.id,
        aud: data.aud,
        iat: data.iat,
        exp: data.exp,
        tenant: decodedCustomToken.tenant_id,
        ...decodedCustomToken.claims,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
