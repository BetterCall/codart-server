
import { InputType, ObjectType, PartialType, } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateCodartInput } from './create-codart.dto';

@InputType()
export class UpdateCodartInput extends PartialType(CreateCodartInput) {
}

@ObjectType()
export class UpdateCodartOutput extends CoreOutput {

}
