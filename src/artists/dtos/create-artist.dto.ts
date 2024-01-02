
import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

import { Artist } from '../entities/artist.entity';

@InputType()
export class CreateArtistInput extends PickType(Artist, [
    'name',
]) {

}

@ObjectType()
export class CreateArtistOutput extends CoreOutput {
    @Field(type => Int, { nullable: true })
    id?: number
}
