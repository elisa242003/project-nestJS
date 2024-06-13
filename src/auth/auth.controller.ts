import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/loginlocal')
  async Login(@Request() req) {
    return req.user;
  }
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.validateUser(signInDto.email, signInDto.password);
  }
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
