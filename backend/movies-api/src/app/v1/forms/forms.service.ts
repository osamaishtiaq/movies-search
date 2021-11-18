import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRequestParamDto } from './dtos/movie-request-param.dto';
import { RequestTrailerForm } from './entities/request-trailer-form.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(RequestTrailerForm)
    private trailerRequestRepo: Repository<RequestTrailerForm>,
  ) {}

  async createMovieRequest(body: MovieRequestParamDto): Promise<any> {
    await this.trailerRequestRepo.insert({
      email: body.email,
      movie_name: body.movie_name,
      phone_number: body.phone_number,
      year: body.year,
      description: body.description,
    });
    return { success: true };
  }
}
