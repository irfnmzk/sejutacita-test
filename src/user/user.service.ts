import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async delete(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    const old = await this.findOne(id);
    if (old) {
      throw new NotFoundException('User not found');
    }
    return this.userModel.findByIdAndUpdate(id, user).exec();
  }
}
