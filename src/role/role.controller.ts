import { Body, Controller, Get, Post } from "@nestjs/common";
import { createRoleDto } from "./dto/createRoleDto";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("")
  createRole(@Body() dto: createRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get("")
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
