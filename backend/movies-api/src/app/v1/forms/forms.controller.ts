import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { MovieRequestParamDto } from './dtos/movie-request-param.dto';
import { FormsService } from './forms.service';

@ApiTags('forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'forms', version: '1' })
export class FormsController {
  constructor(private formService: FormsService) {}

  @Post('movie-request')
  @ApiCreatedResponse({
    description: 'Form to submit new movie requests into the database',
  })
  async createMovieRequest(@Body() body: MovieRequestParamDto) {
    return this.formService.createMovieRequest(body);
  }
}
