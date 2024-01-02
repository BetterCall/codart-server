import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artist } from './entities/artist.entity';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    providers: [
        ArtistsService,
        ArtistsResolver
    ],
    exports: [ArtistsService],

})
export class ArtistsModule { }
