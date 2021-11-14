import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
export class MovieSearchDto {
  @IsNotEmpty()
  searchTerm: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1940)
  @Max(2099)
  year?: number;
}
