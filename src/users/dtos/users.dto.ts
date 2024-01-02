
import { Field, ObjectType } from '@nestjs/graphql';
import {
    PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { User } from '../entitites/user.entity';

@ObjectType()
export class UsersOutput extends PaginationOutput {
    @Field((type) => [User], { nullable: true })
    results?: User[];
}