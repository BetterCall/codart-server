import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth.decorator";
import { Roles } from "src/auth/role.decorator";

import { UsersService } from "./users.service";
import { JwtService } from "src/jwt/jwt.service";

import { User, UserRole } from "./entitites/user.entity";

import { CreateUserInput, CreateUserOutput, } from "./dtos/create-user.dto";
import { UpdateUserInput, UpdateUserOutput } from "./dtos/update-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { ChangeUserRoleInput, ChangeUserRoleOutput } from "./dtos/change-user-role";
import { UserArgs, UserOutput } from "./dtos/user.dto";
import { PaginationArgs, } from "src/common/dtos/pagination.dto";
import { UsersFiltersInput } from "./dtos/filters.dto";
import { UsersOutput } from "./dtos/users.dto";
import { LoginAsInput, LoginAsOutput } from "./dtos/login-as.dto";

@Resolver((of) => User)
export class UsersResolver {
    constructor(
        private readonly service: UsersService,
        private readonly jwtService: JwtService,
    ) { }


    @Mutation(returns => CreateUserOutput)
    async createUser(@Args("input") input: CreateUserInput): Promise<CreateUserOutput> {
        try {
            const existingUser = await this.service.findByEmail(input.email)
            if (existingUser) {
                throw new Error('Email deja utilisée')
            }
            const user = await this.service.create(input)
            return {
                ok: true,
                id: user.id
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(
        @Args('input') { email, password }: LoginInput
    ): Promise<LoginOutput> {
        try {
            const user = await this.service.findByEmail(email)
            await user.checkPassword(password);
            const token = this.jwtService.sign(user.id)
            return {
                ok: true,
                token
            }
        } catch (error) {
            console.log(error)
            return {
                ok: false,
                error: error.message
            }
        }

    }

    @Mutation(returns => LoginAsOutput)
    @Roles(["Admin"])
    async loginAs(
        @Args('input') { email }: LoginAsInput
    ): Promise<LoginAsOutput> {
        try {
            const user = await this.service.findByEmail(email)
            const token = this.jwtService.sign(user.id)
            return {
                ok: true,
                token
            }
        } catch (error) {

            return {
                ok: false,
                error: error.message
            }
        }

    }

    @Query(returns => User)
    @Roles(['Any'])
    me(@AuthUser() authUser: User): User {
        return authUser
    }

    @Mutation(returns => UpdateUserOutput, { name: "updateUser" })
    async update(
        @AuthUser() authUser: User,
        @Args('id', { type: () => Int }) id: number,
        @Args("input") input: UpdateUserInput,
    ): Promise<UpdateUserOutput> {

        try {
            const user = await this.service.findOne(id)
            await this.service.update(id, input)
            return {
                ok: true
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }

    @Mutation(returns => ChangeUserRoleOutput)
    @Roles(['Any'])
    async changeUserRole(
        @AuthUser() authUser: User,
        @Args('id', { type: () => Int }) id: number,
        @Args("input") input: ChangeUserRoleInput
    ): Promise<ChangeUserRoleOutput> {

        try {
            const user = await this.service.findOne(id)
            await this.service.update(id, input)
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }

    }

    @Query(returns => UserOutput, { name: "user" })
    @Roles(['Any'])
    async findOne(
        @AuthUser() authUser: User,
        @Args() { id }: UserArgs
    ): Promise<UserOutput> {
        try {
            const result = await this.service.findOne(id)
            return {
                ok: true,
                result
            }
        } catch (error) {
            return {
                ok: true,
                error: error.message
            }
        }

    }

    @Query(returns => UsersOutput)
    @Roles(['Any'])
    async users(
        @AuthUser() authUser: User,
        @Args() { limit, offset }: PaginationArgs,
        @Args("where") { search, roles, ...where }: UsersFiltersInput,

    ): Promise<UsersOutput> {

        try {
            // @ts-ignore
            const [results, count] = await this.service.findAndCount({ limit, offset, search, roles, where })
            return {
                ok: true,
                results,
                hasMore: limit + offset < count,
            };
        } catch (error) {
            console.log(error)
            return {
                ok: false,
                error: error.message,
                results: [],
                hasMore: false,
            };
        }
    }
}