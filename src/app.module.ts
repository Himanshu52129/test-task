import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { TaskController } from './task/task.controller';
import {
  AdminTaskController,
  AdminUserController,
} from './admin/admin.controller';
import { TaskService } from './task/task.service';
import { Task } from './task/task.entity';
import { AdminTaskService, AdminUserService } from './admin/admin.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: ['dist/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([User, Task]),
  ],
  controllers: [
    UserController,
    TaskController,
    AdminTaskController,
    AdminUserController,
  ],
  providers: [UserService, TaskService, AdminUserService, AdminTaskService],
})
export class AppModule {}
