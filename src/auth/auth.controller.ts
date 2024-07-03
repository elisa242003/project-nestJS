import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { AuthGuard } from "./auth.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  Login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }
  @Public()
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
