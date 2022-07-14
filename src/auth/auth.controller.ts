import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() payload: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: any): Promise<any> {
    return this.authService.getUser(req.user.id);
  }

  @Post('refresh')
  async refresh(@Body() payload: RefreshTokenDto) {
    return this.authService.refreshAccessToken(payload.refreshToken);
  }
}
