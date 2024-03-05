import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { loginUserDto } from "./dto/loginUserDto";
import { registerUserDto } from "./dto/registerUserDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  registerUser(@Body() dto: registerUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post("sign-in")
  login(@Body() dto: loginUserDto) {
    return this.authService.loginUser(dto);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getCurrentUser(@Req() req) {
    const user = req.user;
    console.log(user);
    return this.authService.getCurrentUser(user.id);
  }
}
