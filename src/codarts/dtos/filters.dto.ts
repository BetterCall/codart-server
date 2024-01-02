import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CodartsFiltersInput {
    @Field(type => String, { nullable: true })
    search?: string
}

