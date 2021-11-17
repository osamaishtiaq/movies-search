import {
  createYoutubeEmbedHtml,
  createYoutubeEmbedUrl,
  createYoutubeVideoUrl,
} from '@shared/helpers/youtube.helper';
import { MovieDBDetailsDto } from '@shared/providers/movie-db-api/dtos/movie-db-details-response.dto';
import { YoutubeSearchResultItems } from '@shared/providers/youtube-api/dtos/youtube-search-response.dto';

export function createYoutubeTrailerSearchTerm(
  movieDbDetails: MovieDBDetailsDto,
): string {
  const movieYear: number =
    movieDbDetails.release_date &&
    new Date(movieDbDetails.release_date).getFullYear();

  let searchTerm = `${movieDbDetails.title}${' ' + movieYear ?? ''} trailer`;
  searchTerm += `|${movieDbDetails.original_title} trailer`;
  return searchTerm;
}

export function getFilteredTrailers(
  resultItems: YoutubeSearchResultItems[],
  movieDbResult: MovieDBDetailsDto,
): any[] {
  return resultItems
    .map((x) => {
      return {
        ...x.snippet,
        video_id: x.id.videoId,
        video_embed_html: createYoutubeEmbedHtml(x.id.videoId),
        video_url: createYoutubeVideoUrl(x.id.videoId),
        vide_embed_url: createYoutubeEmbedUrl(x.id.videoId),
      };
    })
    .filter(
      (x) =>
        x.title
          .toLocaleLowerCase()
          .includes(movieDbResult.title.toLocaleLowerCase()) ||
        x.title
          .toLocaleLowerCase()
          .includes(movieDbResult.original_title.toLocaleLowerCase()),
    );
}
