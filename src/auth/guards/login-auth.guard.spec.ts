import { LoginAuthGuard } from './login-auth.guard';

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    expect(new LoginAuthGuard()).toBeDefined();
  });
});
