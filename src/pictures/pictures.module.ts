import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture, User]),
    UsersModule,
  ],
  providers: [PicturesService],
  controllers: [PicturesController],
  exports: [TypeOrmModule],
})
export class PicturesModule {}
