import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async Login(@Request() req) {
    return req.user;
  }
}
