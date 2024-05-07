import { IsNotEmpty, Matches } from 'class-validator';
import { REGEXES } from '~/utils/constants/regexes';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(REGEXES.PASSWORD, { message: 'Password is too weak' })
  password: string;
}
