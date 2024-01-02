import { Field, InputType, ObjectType, } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { CoreEntity } from 'src/common/entities/core.entity';
import { Codart } from 'src/codarts/entities/codart.entity';

@InputType('ArtistInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Artist extends CoreEntity {

    @Column({ default: "" })
    @Field((type) => String)
    name: string;

    @Field(type => [Codart], { nullable: true })
    @OneToMany(
        type => Codart,
        codart => codart.artist
    )
    codarts: Codart[];

    @BeforeInsert()
    @BeforeUpdate()
    async setSearch() {
        this.search = this.name.toLowerCase()
    }
}

