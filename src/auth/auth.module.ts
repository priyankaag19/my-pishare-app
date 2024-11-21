import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret_key', // Use environment variables
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule), // Handle circular dependency
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule], // Export AuthService and JwtModule if needed
})
export class AuthModule {}
