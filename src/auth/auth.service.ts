import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // Login method to authenticate and generate JWT token
  async login(username: string) {
    // Fetch the user from the database
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    // Create the payload with username and userId (sub) for the JWT token
    const payload: JwtPayload = { username: user.username, sub: user.id };
    console.log('Payload to sign:', payload);
    try {
      const token = this.jwtService.sign(payload);
      console.log('Generated Token:', token);
      return { success: true, token, userId: user.id};
  } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Token generation failed');
  }
  }

  // This method validates the JWT token
  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
