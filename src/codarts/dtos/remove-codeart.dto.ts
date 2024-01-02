import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class RemoveCodartArgs {
    @Field((type) => Int)
    id: number;
}

@ObjectType()
export class RemoveCodartOutput extends CoreOutput { }
