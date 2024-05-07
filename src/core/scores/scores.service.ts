import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from '~/core/scores/scores.schema';
import { Model, Types } from 'mongoose';
import { CreateScoreDto } from '~/core/scores/dtos/create-score.dto';
import { User } from '~/core/users/users.schema';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<Score>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(userId: Types.ObjectId, score: CreateScoreDto): Promise<Score> {
    const duplicatedScore = await this.scoreModel.findOne({
      string: score.string,
    });
    if (duplicatedScore) {
      throw new HttpException('Duplicated score', HttpStatus.CONFLICT);
    }
    const createdScore = new this.scoreModel({ ...score, user: userId });
    return createdScore.save();
  }

  async findAll(): Promise<Score[]> {
    return this.scoreModel
      .find()
      .sort({ score: 'desc' })
      .limit(10)
      .populate('user', 'username')
      .exec();
  }

  async deleteAll(): Promise<void> {
    await this.scoreModel.deleteMany();
  }
}
