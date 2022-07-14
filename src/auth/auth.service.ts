import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
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
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schema/refresh-token.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userService.findByUsername(payload.username);

    if (!user || !bcrypt.compareSync(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      accessToken: this.createAccessToken(user),
      refreshToken: await this.createRefreshToken(user),
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const refreshTokenDoc = await this.refreshTokenModel
      .findOne({ refreshToken })
      .exec();

    if (!refreshTokenDoc) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findOne(refreshTokenDoc.userId);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
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

  private async createRefreshToken(user: any) {
    const refreshToken = new this.refreshTokenModel({
      userId: user._id,
      refreshToken: uuid.v4(),
    });

    await refreshToken.save();

    return refreshToken.refreshToken;
  }

  private createAccessToken(user: User) {
    const { _id, role } = user as UserDocument;

    return this.jwtService.sign({ id: _id, role });
  }
}
