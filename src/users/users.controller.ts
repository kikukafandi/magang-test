import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() req: RegisterUserDto) {
    const result = await this.usersService.register(req);
    return {
      data: result,
      success: true,
      message: 'User registered successfully',
      statusCode: 200,
    }
  }

  @Post('login')
  async login(@Body() req: LoginUserDto) {
    const result = await this.usersService.login(req);
    return {
      data: result,
      success: true,
      message: 'User logged in successfully',
      statusCode: 200,
    }
  }
}
