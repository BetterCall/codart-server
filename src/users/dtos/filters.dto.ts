import { Field, InputType, } from "@nestjs/graphql";
import { UserRole } from "../entitites/user.entity";


@InputType()
export class UsersFiltersInput {
    @Field(type => String, { nullable: true })
    search: string

    @Field((type) => UserRole, { nullable: true })
    role?: UserRole;

    @Field((type) => [UserRole], { nullable: true })
    roles?: UserRole[];
}

