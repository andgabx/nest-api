import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RecordType } from '@prisma/client';

@ApiTags('Health Records')
@Controller() // We leave this empty to define paths manually below
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('pets/:petId/health')
  @ApiOperation({
    summary: 'Add a health record (Vaccine, Consult, etc.) to a Pet',
  })
  create(
    @Param('petId', ParseIntPipe) petId: number,
    @Body() createHealthDto: CreateHealthRecordDto,
  ) {
    return this.healthService.create(petId, createHealthDto);
  }

  @Get('pets/:petId/health')
  @ApiOperation({ summary: 'List health records of a Pet' })
  @ApiQuery({
    name: 'type',
    enum: RecordType,
    required: false,
    description: 'Filter by type (e.g., VACCINE)',
  })
  findAllByPet(
    @Param('petId', ParseIntPipe) petId: number,
    @Query('type') type?: RecordType,
  ) {
    return this.healthService.findAllByPet(petId, type);
  }

  @Get('health/:id')
  @ApiOperation({ summary: 'Get a specific health record details' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.healthService.findOne(id);
  }

  @Patch('health/:id')
  @ApiOperation({ summary: 'Update a health record' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHealthDto: UpdateHealthRecordDto,
  ) {
    return this.healthService.update(id, updateHealthDto);
  }

  @Delete('health/:id')
  @ApiOperation({ summary: 'Delete a health record' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.healthService.remove(id);
  }
}
