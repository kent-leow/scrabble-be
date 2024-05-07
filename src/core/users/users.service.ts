import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '~/core/users/users.schema';
import { CreateUserDto } from '~/core/users/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(
    id: Types.ObjectId,
    dto: Partial<User>,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findOne(username: string): Promise<User | null | undefined> {
    return this.userModel.findOne({ username });
  }

  async findOneByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.userModel.findOne({ refreshToken });
  }
}
