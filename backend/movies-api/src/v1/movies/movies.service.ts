import { Injectable } from '@nestjs/common';
import { MovieDBResponseItem } from 'src/shared/services/movie-db-api/dtos/movie-db-response.dto';
import { MovieDbSearchParamDto } from 'src/shared/services/movie-db-api/dtos/movie-db-search-param.dto';
import { MovieDbAPIService } from 'src/shared/services/movie-db-api/movie-db-api.service';
import { YoutubeApiService } from 'src/shared/services/youtube-api/youtube-api.service';

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

    const youtubeSearch = searchParams.searchTerm
      .toLocaleLowerCase()
      .includes('trailer')
      ? searchParams.searchTerm
      : `${searchParams.searchTerm} trailer`;

    const youtubeResults = await this.youtubeApiService.searchTrailer(
      youtubeSearch,
    );

    const trailersList = youtubeResults
      .map((x) => x.snippet)
      .filter((x) =>
        x.title
          .toLowerCase()
          .includes(searchParams.searchTerm.toLocaleLowerCase()),
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

  async getDetailsById(movieId: number): Promise<any> {
    return 'Hellow world! ' + movieId;
  }
}
