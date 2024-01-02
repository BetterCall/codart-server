import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInputError } from "apollo-server-express";
import { DeepPartial, Repository } from "typeorm";

import { FindArgs } from "src/common/types/find-order.type";
import { searchQuery } from "src/common/typeorm/helper";

import { Artist } from "./entities/artist.entity";

@Injectable()
export class ArtistsService {

    constructor(
        @InjectRepository(Artist) private readonly repo: Repository<Artist>,
    ) { }

    async findOne(id: number): Promise<Artist> {
        const result = await this.repo.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException("Not Found")
        }
        return result;
    }

    async create(input: DeepPartial<Artist>): Promise<Artist> {
        const result = await this.repo.save(
            this.repo.create(input)
        )
        if (!result) {
            throw new UserInputError('Error')
        }
        return result
    }

    async remove(id: number): Promise<Artist> {
        const result = await this.findOne(id);
        return this.repo.remove(result)
    }

    async update(id: number, input: DeepPartial<Artist>): Promise<Artist> {
        const result = await this.repo.preload({
            id,
            ...input
        })
        if (!result) {
            throw new NotFoundException('Not Found')
        }
        return this.repo.save(result)
    }

    async findAndCount({
        limit,
        offset,
        relations = [],
        order = { createdAt: "DESC" },
        where,
        search
    }: FindArgs<Artist>): Promise<[Artist[], number]> {

        if (search) {
            if (Array.isArray(where)) {
                where.map(condition => ({ ...condition, search: searchQuery(search) }))
            } else {
                where = { ...where, search: searchQuery(search) }
            }
        }
        const result = await this.repo.findAndCount({
            ...(limit && { take: limit }),
            ...(offset && { skip: offset }),
            ...(where && { where }),
            relations,
            order
        })

        return result
    }

}
