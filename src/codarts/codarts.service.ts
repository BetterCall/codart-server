import { Injectable, NotFoundException } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInputError } from "apollo-server-express";
import { searchQuery } from "src/common/typeorm/helper";
import { FindArgs } from "src/common/types/find-order.type";
import { DeepPartial, Repository } from "typeorm";

import { Codart } from "./entities/codart.entity";

@Injectable()
export class CodartsService {

    constructor(
        @InjectRepository(Codart) private readonly repo: Repository<Codart>,
    ) { }

    async findOne({ where }): Promise<Codart> {
        const result = await this.repo.findOne({ where });
        if (!result) {
            throw new NotFoundException("Not Found")
        }
        return result;
    }

    async create(input: DeepPartial<Codart>): Promise<Codart> {
        const result = await this.repo.save(
            this.repo.create(input)
        )
        if (!result) {
            throw new UserInputError('Error')
        }
        return result
    }

    async remove(id: number): Promise<Codart> {
        const result = await this.findOne({ where: { id } });
        return this.repo.remove(result)
    }

    async update(id: number, input: DeepPartial<Codart>): Promise<Codart> {
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
    }: FindArgs<Codart>): Promise<[Codart[], number]> {

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

    // @Cron('45 * * * * *')
    // handleCron() {
    //     console.log("CRON")
    // }

}
