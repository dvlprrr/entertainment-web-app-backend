import { Body, Controller, Delete, Patch } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  updateUser(@Body() dto: { id: number; newEmail: string }) {
    const { id, newEmail } = dto;
    const updatedUser = this.userService.updateUser(id, newEmail);

    return updatedUser;
  }

  @Delete()
  deleteuser(@Body() dto: { id: number }) {
    return this.userService.deleteUser(dto.id);
  }
}
