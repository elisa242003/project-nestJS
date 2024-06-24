import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Public } from "./public.decorator";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  Login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }
  @UseGuards(LocalAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
