import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [MoviesModule, FormsModule],
})
export class V1Module {}
