
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('/')
    async createUser(@Body('email') email: string, @Body('name') name: string, @Body('password') password: string, @Body('active') active: boolean) {
        return this.usersService.createUser({
            email,
            name,
            password,
            active
        });
    }
    @Public()
    @Get('/')
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
