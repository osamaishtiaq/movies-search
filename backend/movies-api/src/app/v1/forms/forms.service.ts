import { Injectable } from '@nestjs/common';
import { MovieRequestParamDto } from './dtos/movie-request-param.dto';

@Injectable()
export class FormsService {
  async createMovieRequest(body: MovieRequestParamDto): Promise<any> {
    return { success: true };
  }
}
