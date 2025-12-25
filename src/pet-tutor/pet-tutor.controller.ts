import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PetTutorService } from './pet-tutor.service';
import { AddTutorDto } from 'src/pet-tutor/dto/add-tutor.dto';

@ApiTags('Pet Tutors')
@Controller('pets/:petId/tutors')
export class PetTutorController {
  constructor(private readonly petTutorService: PetTutorService) {}

  @Post()
  @ApiOperation({ summary: 'Assign a tutor to a pet' })
  addTutor(
    @Param('petId', ParseIntPipe) petId: number,
    @Body() addTutorDto: AddTutorDto,
  ) {
    return this.petTutorService.addTutor(petId, addTutorDto);
  }

  @Delete(':tutorId')
  @ApiOperation({ summary: 'Remove a tutor from a pet' })
  removeTutor(
    @Param('petId', ParseIntPipe) petId: number,
    @Param('tutorId', ParseIntPipe) tutorId: number,
  ) {
    return this.petTutorService.removeTutor(petId, tutorId);
  }
}