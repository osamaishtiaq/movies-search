import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { ENV_KEYS } from 'src/shared/constants';
import { createQueryParamsString } from 'src/shared/utils';
import {
  YoutubeSearchResponseDto,
  YoutubeSearchResultItems,
} from './dtos/youtube-search-response.dto';

@Injectable()
export class YoutubeApiService {
  baseUrl: string;
  apiKey: string;

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.config.get<string>(ENV_KEYS.YOUTUBE_API_BASE_URL);
    this.apiKey = this.config.get<string>(ENV_KEYS.YOUTUBE_API_KEY);
  }

  async searchTrailer(searchTerm: string): Promise<YoutubeSearchResultItems[]> {
    Logger.log('YoutubeApiService.searchTrailer - params: ', searchTerm);
    const params = {
      topidId: '/m/02vxn',
      key: this.apiKey,
      type: 'video',
      videoDuration: 'short',
      safeSearch: 'none',
      videoEmbeddable: 'true',
      q: searchTerm,
      part: 'snippet',
    };

    const url = `${this.baseUrl}/search?${createQueryParamsString(params)}`;

    try {
      const resp: YoutubeSearchResponseDto = await firstValueFrom(
        this.httpService.get(url).pipe(map((resp) => resp.data)),
      );

      const searchResults = resp.items;

      return searchResults;
    } catch (err) {
      Logger.error(
        `ERROR OCCURRED - YoutubeApiService.searchTrailer - URL: ${url} - ERROR: ${err}`,
      );
      return [];
    }
  }
}
