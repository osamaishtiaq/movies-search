import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { MovieDbAPIService } from './shared/services/movie-db-api/movie-db-api.service';
import { SharedModule } from './shared/shared.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [V1Module, SharedModule, HttpModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [MovieDbAPIService],
})
export class AppModule {}
