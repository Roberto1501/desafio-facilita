import { Controller, Post, Body, BadRequestException, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as csurf from 'csurf';
import { User } from './user.entity';

export interface ILoginResponse {
    id: number;
    name: string;
}

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // create user
    @Post()
    async create(@Body() user: User, @Req() req): Promise<{ user: User }> {
        // Validação do token CSRF antes de processar a requisição
            
        try {
            const createdUser = await this.userService.create(user);
            return { user: createdUser };
        } catch (error) {
            throw new BadRequestException('Failed to create user.');
        }
    }

    // login user
    @Post('/login')

    async login(@Body() { email, password }, @Req() req): Promise<{ data: ILoginResponse;  }> {
        // Validação do token CSRF antes de processar a requisição

        const user = await this.userService.login(email);

        if (!user || user.password !== password) {
            throw new BadRequestException('Email or password provided is incorrect');
        }

        return {
            data: {
                id: user.id,
                name: user.name,
                

            },
        };
    }
}
