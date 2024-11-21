import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return { message: 'User not found', success: false };
    }

    const loginResponse = await this.authService.login(username);
    return {
      success: true,
      userId: user.id,
      userName: user.username,
      token: loginResponse.token,
    };
  }

  @Get()
  async getUserDetails() {
    console.log("Fetching user details...");
    const users = await this.usersService.findAll();
    return users;
  }
}
