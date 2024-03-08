import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { createRoleDto } from "./dto/createRoleDto";
import { Roles } from "./role.decorator";
import { Role } from "./role.enum";
import { RolesGuard } from "./role.guard";
import { RoleService } from "./role.service";

@Controller("role")
@UseGuards(AuthGuard, RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.ADMIN)
  @Post()
  createRole(@Body() dto: createRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Roles(Role.ADMIN)
  @Get("")
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
