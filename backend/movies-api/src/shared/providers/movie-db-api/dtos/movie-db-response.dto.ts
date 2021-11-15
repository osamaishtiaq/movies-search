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
      x = this.updateBackdropPosterUrl(x, smallImgPath, largeImgPath);

      // remove unneccessary fields
      delete x['genre_ids'];
      delete x['video'];
      delete x['adult'];

      return x;
    });

    return moviesList;
  }

  static updateBackdropPosterUrl(
    dto: IMovieDbItem,
    smallImgPath: string,
    largeImgPath: string,
  ): any {
    dto.backdrop_path =
      dto.backdrop_path && `${largeImgPath}${dto.backdrop_path}`;
    dto.poster_path = dto.poster_path && `${smallImgPath}${dto.poster_path}`;
    return dto;
  }
}

interface IMovieDbItem {
  backdrop_path: string;
  poster_path: string;
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
