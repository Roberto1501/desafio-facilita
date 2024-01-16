import { Controller, Get, Post, Param, Delete, Put, Body, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    // get all tasks
    @Get()
    async findAll(): Promise<Tasks[]> {
        return await this.taskService.findAll();
    }

    // get one task
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Tasks> {
        const task = await this.taskService.findOne(id);

        if (!task) {
            throw new Error("Task not found");
        } else {
            return task;
        }
    }

    // create task
    @Post()
    async create(@Body() task: Tasks, @Req() req): Promise<{ task: Tasks }> {
        // Validação do token CSRF antes de processar a requisição

        try {
            const createdTask = await this.taskService.create(task);
            return { task: createdTask};
        } catch (error) {
            throw new BadRequestException('Failed to create task.');
        }
    }

    // update task
    @Put(':id')
    async update(@Param('id') id: number, @Body() task: Tasks): Promise<Tasks> {
        return await this.taskService.update(id, task);
    }

    // delete task
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const task = await this.taskService.findOne(id);
        if (!task) {
            throw new Error("Task not found");
        } else {
            await this.taskService.delete(id);
        }
    }
}
