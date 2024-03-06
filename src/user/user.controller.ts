import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { updateUserDto } from "./dto/updateUserDto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch()
  updateUser(@Body() dto: updateUserDto, @Req() req) {
    const { email } = dto;
    const { id } = req.user;
    const updatedUser = this.userService.updateUser(email, id);

    return updatedUser;
  }

  @Delete()
  deleteuser(@Body() dto: { id: number }) {
    return this.userService.deleteUser(dto.id);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
