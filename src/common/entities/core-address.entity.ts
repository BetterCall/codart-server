import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
    Column
} from 'typeorm';
import { CoreEntity } from './core.entity';

@ObjectType()
export class CoreAddressEntity extends CoreEntity {
    @Field((type) => Float)
    @Column({ default: 0, type: 'double precision' })
    lat: number;

    @Field((type) => Float)
    @Column({ default: 0, type: 'double precision' })
    lng: number;

    @Column({ default: "" })
    @Field((type) => String)
    streetNumber: string;

    @Column({ default: "" })
    @Field((type) => String)
    street: string;

    @Column({ default: "" })
    @Field((type) => String)
    postal: string;

    @Column({ default: "" })
    @Field((type) => String)
    city: string;

}