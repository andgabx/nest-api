import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Usuários')
@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users
  @ApiOperation({
    summary: 'Lists all users',
    description: 'Returns a list of all users. Can filter by role.',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['INTERN', 'ENGINEER', 'ADMIN'],
  })
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  @ApiOperation({
    summary: 'Gets a user by ID',
    description: 'Returns the details of a user based on the provided ID.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('interns') // GET /users/interns
  @ApiOperation({
    summary: 'Lists all interns',
    description: 'Returns a list of all users with the role of intern.',
  })
  findAllInterns() {
    return this.usersService.findAll('INTERN');
  }

  @Post() // POST /users
  @ApiOperation({
    summary: 'Creates a new user',
    description:
      'Creates a new user with the information provided in the request body.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'john@example.com' },
        role: {
          type: 'string',
          enum: ['ENGINEER', 'INTERN', 'ADMIN'],
          example: 'ENGINEER',
        },
      },
    },
  })
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  @ApiOperation({
    summary: 'Updates an existing user',
    description: 'Updates the information of a user based on the provided ID.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'john@example.com' },
        role: {
          type: 'string',
          enum: ['ENGINEER', 'INTERN', 'ADMIN'],
          example: 'ENGINEER',
        },
      },
    },
  })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  @ApiOperation({
    summary: 'Deletes a user',
    description: 'Deletes a user based on the provided ID.',
  })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
