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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';

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

  @Get('interns')
  @ApiOperation({
    summary: 'Lists all interns',
    description: 'Returns a list of all users with the role of intern.',
  })
  findAllInterns() {
    return this.usersService.findAll('INTERN');
  }

  @Post()
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
        id: { type: 'number', example: 123 },
      },
    },
  })
  createUser(
    @Body()
    user: {
      name: string;
      id: number;
      email: string;
      role: 'ENGINEER' | 'INTERN' | 'ADMIN';
    },
  ) {
    return this.usersService.createUser(user);
  }

  @Patch(':id') // PATCH /users/:id
  @ApiOperation({
    summary: 'Updates an existing user',
    description: 'Updates the information of a user based on the provided ID.',
  })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.updateUser(id, userUpdate);
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
