import { Field, ObjectType } from '@nestjs/graphql';

import {
    PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Codart } from '../entities/codart.entity';

@ObjectType()
export class CodartsOutput extends PaginationOutput {
    @Field((type) => [Codart], { nullable: true })
    results?: Codart[];
}