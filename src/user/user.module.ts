import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    const admin = await this.userService.findByUsername('admin@example.com');

    if (!admin) {
      await this.userService.create({
        username: 'admin@example.com',
        firstName: 'irfan',
        lastName: 'marzuki',
        role: 'admin',
        password: 'password',
      });
    }
  }
}
