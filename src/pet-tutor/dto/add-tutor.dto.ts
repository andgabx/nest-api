import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddTutorDto {
  @ApiProperty({
    description: 'Email of the user to be added as a tutor',
    example: 'spouse@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}