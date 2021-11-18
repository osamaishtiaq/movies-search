import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestTrailerForm } from '@v1/forms/entities/request-trailer-form.entity';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [TypeOrmModule.forFeature([RequestTrailerForm])],
})
export class FormsModule {}
