import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-custom';
import { UnauthorizedException } from '~/auth/domain/exceptions/unauthorized.exception';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'inspire-jwt') {
  async validate(
    request: FastifyRequest<{ Headers: { authorization: string } }>,
  ) {
    if (!request?.headers?.authorization) throw new UnauthorizedException();
    return {};
  }
}
