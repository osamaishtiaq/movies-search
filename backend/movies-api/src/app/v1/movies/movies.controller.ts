import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieSearchDto } from './dtos/movie-search-query.dto';
import { MovieDBResponseItem } from '@shared/providers/movie-db-api/dtos/movie-db-response.dto';
import { MovieDetailsParamDto } from './dtos/movie-details-param.dto';
import { MovieDetailsResponse } from './dtos/movie-details-response.dto';

@ApiTags('movies')
@Controller({ path: 'movies', version: '1' })
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @ApiResponse({
    status: 200,
    type: MovieDBResponseItem,
    description: 'returns list of movies matching the search terms',
  })
  async findAll(@Query() searchParams: MovieSearchDto): Promise<any> {
    // const keys = await this.cacheManager.keys();
    // console.log('Cache keys: ', keys);
    return this.moviesService.findMoviesByCriteria(searchParams);
  }

  @Get('trending-daily')
  @ApiResponse({
    status: 200,
    type: MovieDBResponseItem,
    description: 'returns list of trending movies today',
  })
  async getDailyTrending(): Promise<MovieDBResponseItem[]> {
    return this.moviesService.getTrendingDaily();
  }

  @Get('top-rated')
  @ApiResponse({
    status: 200,
    type: MovieDBResponseItem,
    description: 'returns list of top rated movies',
  })
  async getTopRated(): Promise<MovieDBResponseItem[]> {
    return this.moviesService.getTopRated();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: MovieDetailsResponse,
    description: 'get movie details by id',
  })
  async getDetailsById(@Param() param: MovieDetailsParamDto): Promise<any> {
    return this.moviesService.getDetailsById(param.id);
  }
}
