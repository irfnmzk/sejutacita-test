import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userService.findByUsername(payload.username);

    if (!user || !bcrypt.compareSync(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      accessToken: this.createAccessToken(user),
    };
  }

  async getUser(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }

    const user = (await this.userService.findOne(id)) as UserDocument;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
    };
  }

  private createAccessToken(user: User) {
    const { _id, role } = user as UserDocument;

    return this.jwtService.sign({ id: _id, role });
  }
}
