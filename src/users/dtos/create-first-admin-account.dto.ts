import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entitites/user.entity";


@InputType()
export class CreateFirstAdminAccountInput extends PickType(User, ["firstname", "lastname", 'email', 'password']) { }

@ObjectType()
export class CreateFirstAdminAccountOutput extends CoreOutput {
    @Field(type => Int, { nullable: true })
    id?: number
}