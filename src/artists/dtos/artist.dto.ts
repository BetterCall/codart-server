import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Artist } from '../entities/artist.entity';

@ArgsType()
export class ArtistArgs {
    @Field((type) => Int)
    id: number;
}

@ObjectType()
export class ArtistOutput extends CoreOutput {
    @Field(type => Artist, { nullable: true })
    result?: Artist
}
