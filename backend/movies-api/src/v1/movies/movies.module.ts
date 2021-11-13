import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [SharedModule],
})
export class MoviesModule {}
