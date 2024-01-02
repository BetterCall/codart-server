import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "src/jwt/jwt.service";
import { UsersService } from "src/users/users.service";
import { allowedRoles } from "./role.decorator";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) { }
    async canActivate(context: ExecutionContext) {

        try {
            const roles = this.reflector.get<allowedRoles>(
                'roles',
                context.getHandler(),
            );
            if (!roles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();

            if (request) {
                const token = request.headers['x-jwt'];
                if (token) {
                    const decoded = this.jwtService.verify(token.toString());
                    if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                        const user = await this.userService.findOne(decoded['id']);
                        if (user) {
                            request['user'] = user;
                            if (roles.includes('Any')) {
                                return true;
                            }
                            return roles.includes(user.role);
                        }
                    }
                }
                return false;
            }
            const gqlContext = GqlExecutionContext.create(context).getContext();
            const token = gqlContext.token;
            if (token) {
                const decoded = this.jwtService.verify(token.toString());
                console.log(decoded)
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const user = await this.userService.findOne(decoded['id']);
                    if (user) {
                        gqlContext['user'] = user;
                        if (roles.includes('Any')) {
                            return true;
                        }
                        return roles.includes(user.role);
                    }
                }
            }
            return false;
        } catch (error) {
            return false;
        }

    }
}