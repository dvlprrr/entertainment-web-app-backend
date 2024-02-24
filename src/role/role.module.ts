import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/auth.guard";
import { PrismaService } from "src/prisma.service";
import { RoleController } from "./role.controller";
import { RolesGuard } from "./role.guard";
import { RoleService } from "./role.service";

@Module({
  providers: [
    RoleService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [RoleController],
})
export class RoleModule {}
