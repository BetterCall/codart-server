
import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

import { Codart } from '../entities/codart.entity';

@InputType()
export class CreateCodartInput extends PickType(Codart, [
    "name",
    "publicLink",
    "hiddenLink"
]) {
    @Field(type => Int)
    artistId: number
}

@ObjectType()
export class CreateCodartOutput extends CoreOutput {
    @Field(type => Int, { nullable: true })
    id?: number
}
