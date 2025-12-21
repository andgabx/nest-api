import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export class UsersService {
  users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'ENGINEER' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'INTERN' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'ADMIN' },
    { id: 4, name: 'David', email: 'david@example.com', role: 'ENGINEER' },
    { id: 5, name: 'Eve', email: 'eve@example.com', role: 'INTERN' },
    { id: 6, name: 'Frank', email: 'frank@example.com', role: 'ENGINEER' },
    { id: 7, name: 'Grace', email: 'grace@example.com', role: 'ADMIN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException(`No users with role ${role} found`);
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { ...createUserDto, id: usersByHighestId[0].id + 1 };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return `${removedUser?.name} has been removed.`;
  }
}
