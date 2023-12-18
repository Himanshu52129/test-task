import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserDto } from '../user/user.dto';
import { Task } from '../task/task.entity';
import { TaskDto } from '../task/task.dto';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(userId: number): Promise<User | string> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return 'User not found.';
    }

    return user;
  }

  async createUser(userDto: UserDto) {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async deleteUser(userId: string) {
    return this.userRepository.delete(userId);
  }
}

@Injectable()
export class AdminTaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(taskData: TaskDto): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  async editTask(taskId: number, taskData: Partial<Task>): Promise<Task> {
    const task = await this.getTask(taskId);

    Object.assign(task, taskData);

    return this.taskRepository.save(task);
  }

  async searchAndSortTasks(
    sortBy: 'completionStatus' | 'description' | 'priority' | 'dueDate',
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (sortBy) {
      switch (sortBy) {
        case 'completionStatus':
          queryBuilder.orderBy('task.completed');
          break;
        case 'description':
          queryBuilder.orderBy('task.description');
          break;
        case 'priority':
          queryBuilder.orderBy('task.priority');
          break;
        case 'dueDate':
          queryBuilder.orderBy('task.dueDate');
          break;
        default:
          throw new BadRequestException(
            'Invalid sortBy value, it can only one of them: completionStatus/description/priority/dueDate',
          );
      }
    }

    return queryBuilder.getMany();
  }

  async getTask(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }
}
