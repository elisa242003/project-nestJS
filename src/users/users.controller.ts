import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('/')
    async createUser(@Body('email') email: string, @Body('name') name: string, @Body('password') password: string, @Body('active') active: boolean) {
        return this.usersService.createUser({
            email: email,
            name: name,
            password: password,
            active: active
        });
    }
}
