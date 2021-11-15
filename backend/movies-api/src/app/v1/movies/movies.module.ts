import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SharedModule } from '@shared/shared.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_KEYS } from '@shared/common/constants';

@Module({
  controllers: [MoviesController],
  providers: [
    MoviesService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
  imports: [
    SharedModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const ttlConfig = +config.get(ENV_KEYS.CACHE_TTL_SECONDS);
        const maxConfig = +config.get(ENV_KEYS.CACHE_MAX_RESPONSE_CACHING);
        return {
          ttl: ttlConfig,
          max: maxConfig,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MoviesModule {}
