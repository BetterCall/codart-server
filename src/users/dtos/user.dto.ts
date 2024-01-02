import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entitites/user.entity';

@ArgsType()
export class UserArgs {
    @Field(type => Int)
    id: number
}

@ObjectType()
export class UserOutput extends CoreOutput {
    @Field((type) => User, { nullable: true })
    result?: User;
}