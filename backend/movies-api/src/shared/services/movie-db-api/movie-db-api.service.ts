import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { ENV_KEYS } from 'src/shared/constants';
import { createQueryParamsString } from 'src/shared/utils';
import {
  MovieDBResponseDto,
  MovieDBResponseItem,
} from './dtos/movie-db-response.dto';
import { MovieDbSearchParamDto } from './dtos/movie-db-search-param.dto';

@Injectable()
export class MovieDbAPIService {
  private baseUrl: string;
  private apiKey: string;
  private smallImgPath: string;
  private largeImgPath: string;

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.config.get<string>(ENV_KEYS.MOVIE_DB_BASE_URL);
    this.apiKey = this.config.get<string>(ENV_KEYS.MOVIE_DB_API_KEY);

    const movieDbSiteUrl = this.config.get<string>(ENV_KEYS.MOVIE_DB_SITE_URL);
    const smallImgPath = this.config.get<string>(
      ENV_KEYS.MOVIE_DB_SMALL_IMG_PATH,
    );
    this.smallImgPath = `${movieDbSiteUrl}${smallImgPath}`;

    const largeImgPath = this.config.get<string>(
      ENV_KEYS.MOVIE_DB_LARGE_IMG_PATH,
    );
    this.largeImgPath = `${movieDbSiteUrl}${largeImgPath}`;
  }

  async getMovies(
    searchParam: MovieDbSearchParamDto,
  ): Promise<MovieDBResponseItem[]> {
    Logger.log('MovieDbAPIService.getMovies - params: ', searchParam);

    const params = {
      api_key: this.apiKey,
      query: searchParam.searchTerm,
      language: 'en-US',
      ...(searchParam.year && { primary_release_year: searchParam.year }),
    };

    const url = `${this.baseUrl}/search/movie?${createQueryParamsString(
      params,
    )}`;

    try {
      const apiResp: MovieDBResponseDto = await firstValueFrom(
        this.httpService.get(url).pipe(map((resp) => resp.data)),
      );

      const movieList: MovieDBResponseItem[] =
        MovieDBResponseDto.mapMovieDbItemsList(
          apiResp,
          this.smallImgPath,
          this.largeImgPath,
        );

      return movieList;
    } catch (err) {
      Logger.error(
        `ERROR OCCURRED - MovieDbAPIService.getMovies - URL: ${url} - ERROR: ${err}`,
      );
      return [];
    }
  }

  async getTrendingDaily(): Promise<MovieDBResponseItem[]> {
    Logger.log('MovieDbAPIService.getTrending');
    const url = `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}&language=en-US`;
    try {
      const apiResp: MovieDBResponseDto = await firstValueFrom(
        this.httpService.get(url).pipe(map((resp) => resp.data)),
      );

      const movieList: MovieDBResponseItem[] =
        MovieDBResponseDto.mapMovieDbItemsList(
          apiResp,
          this.smallImgPath,
          this.largeImgPath,
        );

      return movieList;
    } catch (err) {
      Logger.error(
        `ERROR OCCURRED - MovieDbAPIService.getTrendingDaily - URL: ${url} - ERROR: ${err}`,
      );
      return [];
    }
  }

  async getTopRated(): Promise<MovieDBResponseItem[]> {
    Logger.log('MovieDbAPIService.getTopRated');
    const url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US`;
    try {
      const apiResp: MovieDBResponseDto = await firstValueFrom(
        this.httpService.get(url).pipe(map((resp) => resp.data)),
      );

      const movieList: MovieDBResponseItem[] =
        MovieDBResponseDto.mapMovieDbItemsList(
          apiResp,
          this.smallImgPath,
          this.largeImgPath,
        );

      return movieList;
    } catch (err) {
      Logger.error(
        `ERROR OCCURRED - MovieDbAPIService.getTopRated - URL: ${url} - ERROR: ${err}`,
      );
      return [];
    }
  }
}
