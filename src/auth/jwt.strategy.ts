
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts JWT from the Authorization header (Bearer token)
      secretOrKey: 'your_secret_key', // Secret key used to validate the JWT
      ignoreExpiration: false, // Ensure expiration is not ignored
    });
  }

  // Validate the JWT payload and extract user information
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub); // 'sub' is the userId in the JWT payload
    if (!user) {
      throw new Error('User not found'); // Handle invalid user
    }
    return user; // Return the user information for further use (like attaching it to the request)
  }
}
