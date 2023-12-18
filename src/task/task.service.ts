import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(taskData: Task): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  async editTask(taskId: number, taskData: Partial<Task>): Promise<Task> {
    const task = await this.getTask(taskId);

    Object.assign(task, taskData);

    return this.taskRepository.save(task);
  }

  async searchAndSortTasks(
    completionStatus: boolean,
    sortBy: string,
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (completionStatus !== undefined) {
      queryBuilder.where('task.completed = :completionStatus', {
        completionStatus,
      });
    }

    if (sortBy) {
      queryBuilder.orderBy(`task.${sortBy}`);
    }

    return queryBuilder.getMany();
  }

  private async getTask(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async markTaskAsComplete(taskId: number): Promise<Task> {
    const task = await this.getTask(taskId);

    task.completed = true;

    return this.taskRepository.save(task);
  }
}
