import { Controller, Get } from '@nestjs/common';
import { TrailersService } from './trailers.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('trailers')
@Controller({ path: 'trailers', version: '1' })
export class TrailersController {
  constructor(private readonly trailersService: TrailersService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search trailers' })
  @ApiResponse({ status: 200, description: 'returns found trailers' })
  findAll(): string {
    return 'hello';
  }
}
