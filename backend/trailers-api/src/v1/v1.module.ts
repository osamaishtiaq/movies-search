import { Module } from '@nestjs/common';
import { TrailersModule } from './trailers/trailers.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TrailersModule],
})
export class V1Module {}
