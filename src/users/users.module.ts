import { Module, forwardRef } from '@nestjs/common'; // Add forwardRef for circular dependencies
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Ensure User entity is registered with TypeORM
    forwardRef(() => AuthModule), // Use forwardRef if there's a circular dependency
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService to be available in other modules
})
export class UsersModule {}
