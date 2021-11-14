import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieDbAPIService } from './providers/movie-db-api/movie-db-api.service';
import { YoutubeApiService } from './providers/youtube-api/youtube-api.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MovieDbAPIService, YoutubeApiService],
  exports: [MovieDbAPIService, YoutubeApiService],
})
export class SharedModule {}
