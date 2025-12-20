import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  @ApiOperation({
    summary: 'Gets a user by ID',
    description: 'Returns the details of a user based on the provided ID.',
  })
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Get('interns')
  @ApiOperation({
    summary: 'Lists all interns',
    description: 'Returns a list of all users with the role of intern.',
  })
  findAllInterns() {
    return 'all interns';
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
  createUser(@Body() user: { name: string; id: number }) {
    return `user ${user.name}`;
  }

  @Patch() // PATCH /users/:id
  @ApiOperation({
    summary: 'Updates an existing user',
    description: 'Updates the information of a user based on the provided ID.',
  })
  updateUser(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }
}
