import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth.decorator";
import { Roles } from "src/auth/role.decorator";

import { User } from "src/users/entitites/user.entity";


import { Artist } from "./entities/artist.entity";

import { ArtistsService } from "./artists.service";
import { ArtistArgs, ArtistOutput } from "./dtos/artist.dto";
import { ArtistsOutput } from "./dtos/artists.dto";
import { RemoveArtistArgs, RemoveArtistOutput } from "./dtos/remove-artist.dto";
import { UpdateArtistInput, UpdateArtistOutput } from "./dtos/update-artist.dto";
import { ArtistsFiltersInput } from "./dtos/filters.dto";
import { CreateArtistInput, CreateArtistOutput } from "./dtos/create-artist.dto";


@Resolver((of) => Artist)
export class ArtistsResolver {
    constructor(
        private readonly service: ArtistsService,
    ) { }

    @Mutation(returns => CreateArtistOutput, { name: "createArtist" })
    @Roles(["Any"])
    async create(
        @AuthUser() user,
        @Args("input") input: CreateArtistInput
    ): Promise<CreateArtistOutput> {
        try {
            const artist = await this.service.create(input)
            return {
                ok: true,
                id: artist.id
            }

        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }

    @Query((returns) => ArtistOutput, { name: "artist" })
    @Roles(["Any"])
    async findOne(@AuthUser() owner: User, @Args() { id }: ArtistArgs): Promise<ArtistOutput> {
        try {
            const result = await this.service.findOne(id)
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

    @Query(returns => ArtistsOutput, { name: "artists" })
    @Roles(["Any"])
    async find(
        @Args("where") { search }: ArtistsFiltersInput
    ): Promise<ArtistsOutput> {
        try {
            const [results, count] = await this.service.findAndCount({ search })
            return {
                ok: true,
                results,
            }
        } catch (error) {
            return {
                ok: false,
                results: [],
                error: error.message
            }
        }

    }

    @Mutation(returns => RemoveArtistOutput, { name: "removeArtist" })
    @Roles(["Any"])
    async remove(
        @AuthUser() user: User,
        @Args() { id }: RemoveArtistArgs
    ): Promise<RemoveArtistOutput> {

        try {
            await this.service.findOne(id)
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

    @Mutation(returns => UpdateArtistOutput, { name: "updateArtist" })
    @Roles(["Any"])
    async update(
        @AuthUser() user,
        @Args('id', { type: () => Int }) id: number,
        @Args("input") input: UpdateArtistInput): Promise<UpdateArtistOutput> {

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