import { FindOperator, FindOptionsOrder, FindOptionsWhere } from "typeorm"
import { FindOrderType } from "./find.type"

export type FindArgs<Entity> = {
    ids?: number[]
    search?: string
    limit?: number
    offset?: number
    relations?: string[]
    order?: FindOptionsOrder<Entity>
    where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>
}