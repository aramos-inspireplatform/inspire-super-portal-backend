import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-custom';
import { UnauthorizedException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { DecodedJwtToken } from '~/auth/ioc/guards/types/decoded-token.type';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'inspire-jwt') {
  constructor(
    private readonly accessTokenJwtService: IJsonWebTokensGenerator,
    private readonly userRepository: IUserRepository,
  ) {
    super();
  }

  async validate(
    request: FastifyRequest<{ Headers: { authorization: string } }>,
  ) {
    if (!request?.headers?.authorization) throw new UnauthorizedException();
    const reqAccessToken = `${request?.headers?.authorization}`;
    const accessToken = reqAccessToken.replace('Bearer ', '');
    if (!accessToken) throw new UnauthorizedException();
    try {
      const decodedToken =
        await this.accessTokenJwtService.validate<DecodedJwtToken>({
          token: accessToken,
        });
      if (decodedToken instanceof Error) throw new UnauthorizedException();
      const user = await this.userRepository.findById({
        id: decodedToken.id,
      });
      if (+user.logoutDate > +decodedToken.exp)
        throw new UnauthorizedException();
      return decodedToken;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
