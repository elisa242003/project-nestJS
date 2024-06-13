import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    UsersService
  ],
  exports: [AuthController]
})
export class AuthModule { }
