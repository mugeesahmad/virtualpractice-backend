import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { SessionSerializer } from './strategies/local/session.serializer';
import { ValidateLoginMiddleware } from './middlewares/validate-login/validate-login.middleware';
import { ForwardAuthenticatedMiddleware } from './middlewares/forward-authenticated/forward-authenticated.middleware';

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ForwardAuthenticatedMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: 'auth/login' },
        { method: RequestMethod.POST, path: 'auth/register' },
      )
      .apply(ValidateLoginMiddleware)
      .forRoutes({ method: RequestMethod.POST, path: '/auth/login' });
  }
}
