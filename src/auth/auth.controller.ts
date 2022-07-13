import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginDto) {
    return 'hello world';
  }
}
