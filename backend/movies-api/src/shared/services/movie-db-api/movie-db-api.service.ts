import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { ENV_KEYS } from 'src/shared/constants';
import { MovieDBResponseDto } from './dtos/movie-db-response.dto';

@Injectable()
export class MovieDbAPIService {
  baseUrl: string;
  apiKey: string;

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.config.get<string>(ENV_KEYS.MOVIE_DB_BASE_URL);
    this.apiKey = this.config.get<string>(ENV_KEYS.MOVIE_DB_API_KEY);
  }

  async getMovies(searchTerm: string): Promise<MovieDBResponseDto> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${searchTerm}&language=en-US`;
    return await firstValueFrom(
      this.httpService.get(url).pipe(map((resp) => resp.data)),
    );
  }
}
