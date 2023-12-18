import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ enum: ['low', 'medium', 'high'], default: 'low' })
  @IsEnum(['low', 'medium', 'high'], { message: 'Invalid priority' })
  priority: 'low' | 'medium' | 'high';

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ default: false })
  completed: false;
}
