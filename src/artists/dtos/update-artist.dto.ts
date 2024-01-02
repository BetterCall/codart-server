
import { InputType, ObjectType, PartialType, } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateArtistInput } from './create-artist.dto';

@InputType()
export class UpdateArtistInput extends PartialType(CreateArtistInput) { }

@ObjectType()
export class UpdateArtistOutput extends CoreOutput { }
