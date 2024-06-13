import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }
    async createUser(data: CreateUserDto) {
        const pass = createHash('sha256').update(data.password).digest('hex');
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: pass,
                active: data.active
            }
        });
    }
    async getUserByEmail(email: string) {
        const user = this.prisma.user.findUnique({
            where: { email, active: true }
        });
        if (!user) {
            throw new NotAcceptableException('User not found');
        }
        return user;
    }
}
