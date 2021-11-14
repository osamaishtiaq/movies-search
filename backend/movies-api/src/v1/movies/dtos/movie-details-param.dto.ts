import { IsNumberString } from 'class-validator';

export class MovieDetailsParamDto {
  @IsNumberString()
  id: number;
}
