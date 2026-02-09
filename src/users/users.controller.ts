import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import da from 'zod/v4/locales/da.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() req: any) {
    const result = await this.usersService.register(req);
    return {
      data: result,
      success: true,
      message: 'User registered successfully',
      statusCode: 200,
    }
  }
}
