export class MovieDBResponseDto {
  page: number;
  results: MovieDBResponseItem[];
  total_pages: number;
  total_results: number;

  static mapMovieDbItemsList(
    sourceDto: MovieDBResponseDto,
    smallImgPath: string,
    largeImgPath: string,
  ): MovieDBResponseItem[] {
    const moviesList = sourceDto.results.map((x) => {
      // update url paths for assets
      x.backdrop_path = x.backdrop_path && `${largeImgPath}${x.backdrop_path}`;
      x.poster_path = x.poster_path && `${smallImgPath}${x.poster_path}`;

      // remove unneccessary fields
      delete x['genre_ids'];
      delete x['video'];
      delete x['adult'];

      return x;
    });

    return moviesList;
  }
}

export class MovieDBResponseItem {
  backdrop_path: null | string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date?: Date;
  title: string;
  vote_average: number;
  vote_count: number;
}
