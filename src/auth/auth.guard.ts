import { CanActivate, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"];

    if (!token) {
      return false;
    }

    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.SECRET_KEY
      );
      request.user = decoded;

      return true;
    } catch (error) {
      return false;
    }
  }
}
