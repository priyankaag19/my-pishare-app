import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string }) {
    const { username } = body;
    const response = await this.authService.login(username);  // Get the login response with token
    return response;  // Return success, token, and userId
  }
}
