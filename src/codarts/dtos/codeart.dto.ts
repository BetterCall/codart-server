import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Codart } from '../entities/codart.entity';

@ArgsType()
export class CodartArgs {
  @Field((type) => String)
  code: string;
}

@ObjectType()
export class CodartOutput extends CoreOutput {
  @Field((type) => Codart, { nullable: true })
  result?: Codart;
}
