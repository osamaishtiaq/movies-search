export enum ENV_KEYS {
  ENVIRONMENT = 'ENVIRONMENT',
  APP_PORT = 'APP_PORT',
  YOUTUBE_API_KEY = 'YOUTUBE_API_KEY',
  YOUTUBE_API_BASE_URL = 'YOUTUBE_API_BASE_URL',
  MOVIE_DB_BASE_URL = 'MOVIE_DB_BASE_URL',
  MOVIE_DB_API_KEY = 'MOVIE_DB_API_KEY',
  MOVIE_DB_SMALL_IMG_PATH = 'MOVIE_DB_SMALL_IMG_PATH',
  MOVIE_DB_LARGE_IMG_PATH = 'MOVIE_DB_LARGE_IMG_PATH',
  MOVIE_DB_SITE_URL = 'MOVIE_DB_SITE_URL',
  CACHE_TTL_SECONDS = 'CACHE_TTL_SECONDS',
  CACHE_MAX_RESPONSE_CACHING = 'CACHE_MAX_RESPONSE_CACHING',
  JWT_SECRET = 'JWT_SECRET',
}

export enum ENVIRONMENT {
  DEV = 'develop',
  PROD = 'production',
  STAG = 'staging',
}

export const STATIC_USERS = [
  {
    id: 1,
    username: 'test_user',
    password: 'test_user',
    isActive: true,
  },
  {
    id: 2,
    username: 'john doe',
    password: 'abc123!@#',
    isActive: true,
  },
];
