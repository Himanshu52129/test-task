import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from './admin.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

describe('AdminUserService', () => {
  let adminUserService: AdminUserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    adminUserService = module.get<AdminUserService>(AdminUserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        type: 'default',
      };
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValueOnce(userData as User);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(userData as User);

      const result = await adminUserService.createUser({
        username: 'testuser',
        email: 'test@example.com',
        type: 'default',
      });
      expect(result).toEqual(userData);
    });

    it('should throw an error if user creation fails', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        type: 'default',
      };
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValueOnce(userData as User);
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new Error('Failed to save user'));

      await expect(
        adminUserService.createUser({
          username: 'testuser',
          email: 'test@example.com',
          type: 'default',
        }),
      ).rejects.toThrowError('Failed to save user');
    });
  });
});
