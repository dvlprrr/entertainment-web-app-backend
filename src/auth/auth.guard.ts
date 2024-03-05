import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      request["user"] = decoded;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authorizationHeader = request.headers["authorization"];
    if (!authorizationHeader) {
      return undefined;
    }

    const [type, token] = authorizationHeader.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}
