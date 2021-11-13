import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags } from '@nestjs/swagger';
import { MovieSearchDto } from './dtos/movie-search-query.dto';

@ApiTags('movies')
@Controller({ path: 'movies', version: '1' })
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async findAll(@Query() searchParams: MovieSearchDto): Promise<any> {
    return this.moviesService.findMovies(searchParams.searchTerm);
  }
}
