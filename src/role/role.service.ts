import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createRoleDto } from "./dto/createRoleDto";

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(dto: createRoleDto) {
    try {
      const newRole = await this.prisma.role.create({ data: dto });

      return {
        message: "Роль успешно создана",
        newRole,
      };
    } catch (error) {
      throw new HttpException(
        "Ошибка при создании роли",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getAllRoles() {
    const roles = await this.prisma.role.findMany({});
    if (!roles) {
      throw new Error("Не удалось найти роли");
    }
    return roles;
  }
}
