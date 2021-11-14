export function createYoutubeEmbedHtml(videoId: string) {
  return `<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/${videoId}\" 
  frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; 
  gyroscope; picture-in-picture\" allowfullscreen></iframe>"`;
}

export function createYoutubeVideoUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function createYoutubeEmbedUrl(videoId: string) {
  return `www.youtube.com/embed/${videoId}`;
}
