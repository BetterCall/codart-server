import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth.decorator";
import { Roles } from "src/auth/role.decorator";

import { PaginationArgs } from "src/common/dtos/pagination.dto";
import { User } from "src/users/entitites/user.entity";


import { Codart } from "./entities/codart.entity";

import { CodartsService } from "./codarts.service";
import { CreateCodartInput, CreateCodartOutput } from "./dtos/create-codart.dto";
import { CodartArgs, CodartOutput } from "./dtos/codeart.dto";
import { CodartsOutput } from "./dtos/codearts.dto";
import { RemoveCodartArgs, RemoveCodartOutput } from "./dtos/remove-codeart.dto";
import { UpdateCodartInput, UpdateCodartOutput } from "./dtos/update-codeart.dto";
import { CodartsFiltersInput } from "./dtos/filters.dto";


@Resolver((of) => Codart)
export class CodartsResolver {
    constructor(
        private readonly service: CodartsService,
    ) { }

    @Mutation(returns => CreateCodartOutput, { name: "createCodart" })
    @Roles(["Any"])
    async create(
        @AuthUser() user,
        @Args("input") input: CreateCodartInput
    ): Promise<CreateCodartOutput> {
        try {
            const result = await this.service.create(input)
            return {
                ok: true,
                id: result.id
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }

    @Query((returns) => CodartOutput, { name: "codart" })
    @Roles(["Any"])
    async findOne(@AuthUser() owner: User, @Args() { code }: CodartArgs): Promise<CodartOutput> {
        try {
            const result = await this.service.findOne({ where: { code } })
            return {
                ok: true,
                result
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }

    }

    @Query(returns => CodartsOutput, { name: "codarts" })
    @Roles(["Any"])
    async find(
        @Args() { limit, offset }: PaginationArgs,
        @Args("where") { search, ...where }: CodartsFiltersInput,

    ): Promise<CodartsOutput> {
        try {
            const [results, count] = await this.service.findAndCount({ limit, offset, where, search, relations: ["artist"] })
            return {
                ok: true,
                results,
                hasMore: limit + offset < count
            }
        } catch (error) {
            return {
                ok: false,
                results: [],
                hasMore: false,
                error: error.message
            }
        }

    }

    @Mutation(returns => RemoveCodartOutput, { name: "removeCodart" })
    @Roles(["Any"])
    async remove(
        @AuthUser() user: User,
        @Args() { id }: RemoveCodartArgs
    ): Promise<RemoveCodartOutput> {

        try {
            await this.service.findOne({ where: { id } })
            await this.service.remove(id)
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

    @Mutation(returns => UpdateCodartOutput, { name: "updateCodart" })
    @Roles(["Any"])
    async update(
        @AuthUser() user,
        @Args('id', { type: () => Int }) id: number,
        @Args("input") input: UpdateCodartInput): Promise<UpdateCodartOutput> {

        try {
            // const supplier = await this.service.findOne(id)
            await this.service.update(id, input)
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }

}