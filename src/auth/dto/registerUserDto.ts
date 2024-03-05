import { Role } from "src/role/role.enum";

export interface registerUserDto {
  email: string;
  password: string;
  roleId?: Role;
}
