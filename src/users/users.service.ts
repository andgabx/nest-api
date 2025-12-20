import { ok } from 'assert';

export class UsersService {
  //boilerplate data
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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    email: string;
    role: 'ENGINEER' | 'INTERN' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { ...user, id: usersByHighestId[0].id + 1 };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(
    id: number,
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return ok(removedUser);
  }
}
