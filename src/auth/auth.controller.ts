import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerUserDto } from "./dto/registerUserDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  registerUser(@Body() dto: registerUserDto) {
    return this.authService.registerUser(dto);
  }
}
