import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

const httpClientMock: jest.Mocked<IHttpClient> = {
  post: jest.fn(),
};

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;

  beforeEach(() => {
    signInUseCase = new SignInUseCase(httpClientMock);
  });

  it('should make a POST request to the tenant sign-in endpoint', async () => {
    const signInAttrs = { email: 'test@example.com', password: 'password' };
    const expectedUrl = `${process.env.TENANT_URL}/auth/sign-in`;
    const expectedResponse = {
      data: {
        body: {
          data: {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
          },
        },
      },
    };
    httpClientMock.post.mockResolvedValueOnce(expectedResponse as any);

    const response = await signInUseCase.signIn(signInAttrs);

    expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, signInAttrs);
    expect(response).toEqual(expectedResponse.data.body.data);
  });

  it('should throw an error if the HTTP request fails', async () => {
    const signInAttrs = { email: 'test@example.com', password: 'password' };
    const expectedError = new Error('Failed to sign in');
    httpClientMock.post.mockRejectedValueOnce(expectedError);

    await expect(signInUseCase.signIn(signInAttrs)).rejects.toThrow(
      expectedError,
    );
  });
});
