import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInputError } from "apollo-server-express";
import { searchQuery } from "src/common/typeorm/helper";
import { FindArgs } from "src/common/types/find-order.type";

import { DeepPartial, In, Like, Repository } from "typeorm";

import { User, UserRole, } from "./entitites/user.entity";

interface FindProps extends FindArgs<User> {
    roles?: UserRole[]
}

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) { }

    async findOne(id: number): Promise<User> {
        const user = await this.repo.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('Not Found')
        }
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repo.findOne({ where: { email } })
        return user
    }

    async create(input: DeepPartial<User>): Promise<User> {
        const user = await this.repo.save(
            this.repo.create(input)
        )
        if (!user) {
            throw new UserInputError('No User Input')
        }
        return user
    }

    async update(id: number, input: DeepPartial<User>): Promise<User> {

        const user = await this.repo.preload({ id, ...input })
        if (!user) {
            throw new NotFoundException('Not Found')
        }
        return this.repo.save(user)

    }

    async changePassword(id, password) {
        const user = await this.repo.findOne(id)
        user.password = password
        await this.repo.save(user)
    }

    async findAndCount({
        limit,
        offset,
        relations = [],
        order,
        where,
        roles,
        search

    }: FindProps): Promise<[User[], number]> {
        if (search) {
            if (Array.isArray(where)) {
                where.map(condition => ({ ...condition, search: searchQuery(search) }))
            } else {
                // @ts-ignore
                where = { ...where, search: searchQuery(search) }
            }
        }

        if (roles) {
            if (Array.isArray(where)) {
                where.map(condition => ({ ...condition, role: In(roles) }))
            } else {
                // @ts-ignore
                where = { ...where, role: In(roles) }
            }
        }

        console.log('WHERE ', where)
        console.log('WHERE ', {
            ...(limit && { take: limit }),
            ...(offset && { skip: offset }),
            ...(where && { where }),
            relations,
            order
        })

        const result = await this.repo.findAndCount({
            ...(limit && { take: limit }),
            ...(offset && { skip: offset }),
            ...(where && { where }),
            relations,
            // @ts-ignore
            order
        })

        return result
    }

}
