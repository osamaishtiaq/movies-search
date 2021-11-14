export class YoutubeTrailerDto {
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
