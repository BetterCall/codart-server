import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entitites/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(
    PickType(User, ['email', 'password', "firstname", "lastname", "role"]),
) { }


@ObjectType()
export class UpdateUserOutput extends CoreOutput { }