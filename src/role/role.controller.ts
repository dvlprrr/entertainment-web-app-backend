import { Body, Controller, Get, Post } from "@nestjs/common";
import { createRoleDto } from "./dto/createRoleDto";
import { Role } from "./role.enum";
import { RoleService } from "./role.service";
import { Roles } from "./roles.decorator";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(Role.Admin)
  createRole(@Body() dto: createRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get("")
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
