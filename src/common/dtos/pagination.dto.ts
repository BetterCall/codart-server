import { Field, ObjectType, ArgsType, Int } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@ArgsType()
export class PaginationArgs {
    @Field((type) => Int, { nullable: true })
    offset: number;

    @Field((type) => Int, { nullable: true })
    limit: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
    @Field((type) => Boolean, { nullable: true })
    hasMore?: boolean;
}


@ArgsType()
export class SearchArgs {
    @Field((type) => String, { nullable: true })
    term: string;

}
