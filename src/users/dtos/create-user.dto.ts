import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entitites/user.entity";


@InputType()
export class CreateUserInput extends PickType(User, ["firstname", "lastname", 'email', 'password', "role"]) { }

@ObjectType()
export class CreateUserOutput extends CoreOutput {

    @Field(type => Int, { nullable: true })
    id?: number
}