import { Module } from '@nestjs/common';
import { V1Module } from './app/v1/v1.module';
import { MovieDbAPIService } from '@shared/providers/movie-db-api/movie-db-api.service';
import { SharedModule } from '@shared/shared.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    V1Module,
    SharedModule,
    HttpModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'moviesdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [MovieDbAPIService],
})
export class AppModule {}
