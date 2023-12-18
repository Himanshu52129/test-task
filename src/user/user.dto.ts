// user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsIn } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ enum: ['default', 'admin'], default: 'default' })
  @IsNotEmpty({ message: 'User type is required' })
  @IsIn(['default', 'admin'], { message: 'Invalid user type' })
  type: 'default' | 'admin';
}
