import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'ENGINEER' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'INTERN' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'ADMIN' },
    { id: 4, name: 'David', email: 'david@example.com', role: 'ENGINEER' },
    { id: 5, name: 'Eve', email: 'eve@example.com', role: 'INTERN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
}
