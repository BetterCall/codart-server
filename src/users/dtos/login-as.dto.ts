import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entitites/user.entity";


@InputType()
export class LoginAsInput extends PickType(User, ['email']) { }

@ObjectType()
export class LoginAsOutput extends CoreOutput {
    @Field(type => String, { nullable: true })
    token?: string;
}