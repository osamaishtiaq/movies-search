import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieDBDetailsDto } from '@shared/providers/movie-db-api/dtos/movie-db-details-response.dto';
import { MovieDBResponseItem } from '@shared/providers/movie-db-api/dtos/movie-db-response.dto';
import { MovieDbSearchParamDto } from '@shared/providers/movie-db-api/dtos/movie-db-search-param.dto';
import { MovieDbAPIService } from '@shared/providers/movie-db-api/movie-db-api.service';
import { YoutubeApiService } from '@shared/providers/youtube-api/youtube-api.service';
import { MovieDetailsResponse } from './dtos/movie-details-response.dto';
import {
  createYoutubeTrailerSearchTerm,
  getFilteredTrailers,
} from './helpers/youtube-trailer.helper';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesDbAPIService: MovieDbAPIService,
    private readonly youtubeApiService: YoutubeApiService,
  ) {}

  async findMoviesByCriteria(
    searchParams: MovieDbSearchParamDto,
  ): Promise<MovieDBResponseItem[]> {
    const movieDbApiResponse = await this.moviesDbAPIService.getMovies(
      searchParams,
    );

    return movieDbApiResponse;
  }

  async getTrendingDaily(): Promise<MovieDBResponseItem[]> {
    const movideDbApiResp = await this.moviesDbAPIService.getTrendingDaily();
    return movideDbApiResp;
  }

  async getTopRated(): Promise<MovieDBResponseItem[]> {
    const movideDbApiResp = await this.moviesDbAPIService.getTopRated();
    return movideDbApiResp;
  }

  async getDetailsById(movieId: number): Promise<MovieDetailsResponse> {
    const movieDbApiResp: MovieDBDetailsDto =
      await this.moviesDbAPIService.getById(movieId);

    if (movieDbApiResp == null) {
      throw new NotFoundException(`Couldn't find movie with id: ${movieId}`);
    }

    const youtubeSearch = createYoutubeTrailerSearchTerm(movieDbApiResp);

    const youtubeResults = await this.youtubeApiService.searchTrailer(
      youtubeSearch,
    );

    const trailersList = getFilteredTrailers(youtubeResults, movieDbApiResp);

    return { ...movieDbApiResp, trailers: trailersList };
  }
}
