import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ArtistsFiltersInput {
    @Field(type => String, { nullable: true })
    search?: string
}

