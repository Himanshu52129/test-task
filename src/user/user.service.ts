import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(userId: number): Promise<User | string> {
    const user = await this.userRepository.findOneBy({
      id: userId,
      type: 'default',
    });

    if (!user) {
      return 'User not found.';
    }

    return user;
  }
}
