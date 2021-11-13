import { Injectable } from '@nestjs/common';
import { MovieDbAPIService } from 'src/shared/services/movie-db-api/movie-db-api.service';
import { YoutubeApiService } from 'src/shared/services/youtube-api/youtube-api.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesDbAPIService: MovieDbAPIService,
    private readonly youtubeApiService: YoutubeApiService,
  ) {}

  async findMovies(searchTerm: string): Promise<any> {
    console.log('Fetching movies...');
    const movideDbResp = await this.moviesDbAPIService.getMovies(searchTerm);

    // add trailer as key term

    const youtubeSearch = searchTerm.toLocaleLowerCase().includes('trailer')
      ? searchTerm
      : `${searchTerm} trailer`;

    const youtubeResp = await this.youtubeApiService.searchTrailer(
      youtubeSearch,
    );

    const trailersList = youtubeResp.items
      .map((x) => x.snippet)
      .filter((x) =>
        x.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

    return {
      movie_db: movideDbResp,
      youtube: trailersList,
    };
  }
}
