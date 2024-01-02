import { ArgsType, Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User, UserRole } from '../entitites/user.entity';

@InputType()
export class ChangeUserRoleInput extends PickType(User, ["role"]) { }

@ObjectType()
export class ChangeUserRoleOutput extends CoreOutput { }