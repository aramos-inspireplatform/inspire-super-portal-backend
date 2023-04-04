import { UnauthorizedException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';
import { FastifyRequest } from 'fastify';
import { DecodedJwtToken } from '~/auth/ioc/guards/types/decoded-token.type';
import { JwtAuthStrategy } from '~/auth/ioc/guards/jwt/auth.strategy';

describe('JwtAuthStrategy', () => {
  let jwtAuthStrategy: JwtAuthStrategy;
  let accessTokenJwtService: IJsonWebTokensGenerator;
  let userRepository: IUserRepository;

  beforeEach(() => {
    accessTokenJwtService = {
      validate: jest.fn(),
    } as unknown as IJsonWebTokensGenerator;

    userRepository = {
      findById: jest.fn(),
    } as unknown as IUserRepository;

    jwtAuthStrategy = new JwtAuthStrategy(
      accessTokenJwtService,
      userRepository,
    );
  });

  describe('validate', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer token',
      },
    } as unknown as FastifyRequest<{ Headers: { authorization: string } }>;

    it('should throw an UnauthorizedException if no authorization header is present', async () => {
      const request = {
        headers: {},
      } as unknown as FastifyRequest<{ Headers: { authorization: string } }>;

      await expect(jwtAuthStrategy.validate(request)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if accessToken is empty', async () => {
      const request = {
        headers: {
          authorization: 'Bearer ',
        },
      } as unknown as FastifyRequest<{ Headers: { authorization: string } }>;

      await expect(jwtAuthStrategy.validate(request)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should validate the access token and return decoded token', async () => {
      const mockDecodedToken: DecodedJwtToken = {
        id: '1',
        exp: new Date().getTime() + 3600,
        iat: new Date().getTime(),
      } as any;

      (accessTokenJwtService.validate as jest.Mock).mockResolvedValueOnce(
        mockDecodedToken,
      );

      const mockUser = {
        logoutDate: new Date(),
      };

      (userRepository.findById as jest.Mock).mockResolvedValueOnce(mockUser);

      await expect(jwtAuthStrategy.validate(mockRequest)).resolves.toEqual(
        mockDecodedToken,
      );
    });

    it('should throw an UnauthorizedException if decoded token has expired', async () => {
      const mockDecodedToken: DecodedJwtToken = {
        id: '1',
        exp: new Date().getTime() - 3600,
        iat: 1580622831,
      } as any;

      (accessTokenJwtService.validate as jest.Mock).mockResolvedValueOnce(
        mockDecodedToken,
      );

      const mockUser = {
        logoutDate: new Date(),
      };

      (userRepository.findById as jest.Mock).mockResolvedValueOnce(mockUser);

      await expect(jwtAuthStrategy.validate(mockRequest)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
