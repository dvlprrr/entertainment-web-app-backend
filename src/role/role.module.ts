import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
  providers: [RoleService, PrismaService],
  controllers: [RoleController],
})
export class RoleModule {}
