import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async validateUser(email: string, pass: string): Promise<any> {
        const hashPassword = createHash('sha256').update(pass).digest('hex');
        const user = await this.usersService.getUserByEmail(email);
        if (user && user.password === hashPassword) {
            return user;
        }else{
            throw new UnauthorizedException();
        }
    }
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
