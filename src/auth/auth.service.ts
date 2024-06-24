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
    async generateToken(user: any) {
        const payload = { email: user.email, sub: user.id };
        const token =  await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '60s'
        });
        return token;
    }
    async login(email: string, pass: string): Promise<any> {
        const hashPassword = createHash('sha256').update(pass).digest('hex');
        const user = await this.usersService.getUserByEmail(email);
        if (user && user.password === hashPassword) {
            const jwt = this.generateToken(user);
            return {
                user: { email: user.email },
                access_token: jwt,
            };
        } else {
            throw new UnauthorizedException();
        }
    }
}
