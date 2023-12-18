import { Controller, Patch, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Patch(':id/complete')
  @ApiOperation({
    summary: 'Mark task as done',
    description: 'Endpoint to edit task status to complete',
  })
  markTaskAsComplete(@Param('id') taskId: number) {
    return this.taskService.markTaskAsComplete(taskId);
  }
}
