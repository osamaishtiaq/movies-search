import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieDbAPIService } from './services/movie-db-api/movie-db-api.service';
import { YoutubeApiService } from './services/youtube-api/youtube-api.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MovieDbAPIService, YoutubeApiService],
  exports: [MovieDbAPIService, YoutubeApiService],
})
export class SharedModule {}
