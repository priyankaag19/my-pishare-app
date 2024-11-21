import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Find a user by username
  async findByUsername(username: string): Promise<User | undefined> {
    console.log(`Looking for user: ${username}`);
    const user = await this.usersRepository.findOne({ where: { username } });
    console.log('User found:', user);
    return user;
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.find(); // Retrieves all users from the database
  }

  // Find a user by user ID
  async findById(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return user ?? undefined;
  }

  // Create a new user
  async create(username: string): Promise<User> {
    const user = this.usersRepository.create({ username });
    return this.usersRepository.save(user);
  }
}
