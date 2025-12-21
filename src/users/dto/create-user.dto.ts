import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @ApiProperty({ enum: ['ENGINEER', 'INTERN', 'ADMIN'] })
  @IsEnum(['ENGINEER', 'INTERN', 'ADMIN'], {
    message: 'Role must be either ENGINEER, INTERN, or ADMIN',
  })
  role: 'ENGINEER' | 'INTERN' | 'ADMIN';
}
