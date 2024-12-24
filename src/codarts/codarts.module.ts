import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Codart } from './entities/codart.entity';
import { CodartsResolver } from './codarts.resolver';
import { CodartsService } from './codarts.service';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Codart, Artist])],
  providers: [CodartsResolver, CodartsService, ArtistsService],
  exports: [CodartsService],
})
export class CodartsModule {}
