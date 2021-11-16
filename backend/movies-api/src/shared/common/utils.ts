import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from './constants';

export function createQueryParamsString(paramsObject: any): string {
  return Object.keys(paramsObject)
    .map((x) => `${x}=${paramsObject[x]}`)
    .join('&');
}

export function getJwtSecret(): string {
  const configService = new ConfigService();
  return configService.get(ENV_KEYS.JWT_SECRET);
}
