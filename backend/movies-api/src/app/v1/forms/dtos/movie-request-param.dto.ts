import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
export class MovieRequestParamDto {
  name: string;

  @IsEmail()
  email: string;

  movie_name: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1940)
  @Max(2099)
  year?: number;
}
