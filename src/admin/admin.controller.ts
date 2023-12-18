import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminTaskService, AdminUserService } from './admin.service';
import { UserDto } from '../user//user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskDto } from 'src/task/task.dto';

@ApiTags('admin/users')
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Search the user by its ID',
    description: 'Endpoint to search user by its ID',
  })
  async getUser(@Param('id') userId: number) {
    return await this.adminUserService.getUser(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Creates the user',
    description: 'Endpoint to create the user',
  })
  async createUser(@Body() userDto: UserDto) {
    return await this.adminUserService.createUser(userDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes the user',
    description: 'Endpoint to delete the user',
  })
  async deleteUser(@Param('id') userId: string) {
    return await this.adminUserService.deleteUser(userId);
  }
}

@ApiTags('admin/tasks')
@Controller('admin/tasks')
export class AdminTaskController {
  constructor(private readonly adminTaskService: AdminTaskService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Fetch the task by its ID',
    description: 'Endpoint to fetch the task by its ID',
  })
  getTask(@Param('id') taskId: number) {
    return this.adminTaskService.getTask(taskId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Endpoint to create a new task.',
  })
  createTask(@Body() taskData: TaskDto) {
    return this.adminTaskService.createTask(taskData);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit the task details',
    description: 'Endpoint to edit task details by using Task ID',
  })
  editTask(@Param('id') taskId: number, @Body() taskData: TaskDto) {
    return this.adminTaskService.editTask(taskId, taskData);
  }

  @Get()
  @ApiOperation({
    summary: 'Search the task by Completion Status and Sorting',
    description: 'Endpoint to search all task with sort feature',
  })
  searchAndSortTasks(
    @Query('sortBy')
    sortBy: 'completionStatus' | 'description' | 'priority' | 'dueDate',
  ) {
    return this.adminTaskService.searchAndSortTasks(sortBy);
  }
}
