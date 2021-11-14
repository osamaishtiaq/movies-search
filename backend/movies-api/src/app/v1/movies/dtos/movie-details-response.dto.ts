export class MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  trailers: Trailer[];
}

export class Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export class Genre {
  id: number;
  name: string;
}

export class ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export class ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export class SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export class Trailer {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: Date;
  video_id: string;
  video_embed_html: string;
  video_url: string;
  vide_embed_url: string;
}

export class Thumbnails {
  default: ThumbnailDetails;
  medium: ThumbnailDetails;
  high: ThumbnailDetails;
}

export class ThumbnailDetails {
  url: string;
  width: number;
  height: number;
}
