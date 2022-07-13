import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isValidObjectId } from 'mongoose';
import RoleGuard from 'src/auth/guard/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(RoleGuard(['admin']))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single User' })
  async getUser(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }

    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Edit User' })
  updateUser(@Param('id') id: string, @Body() payload: CreateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }

    return this.userService.update(id, payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete User' })
  removeUser(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }

    return this.userService.delete(id);
  }
}
