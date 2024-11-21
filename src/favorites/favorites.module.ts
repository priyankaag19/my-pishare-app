import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PicturesModule } from '../pictures/pictures.module'; // Import PicturesModule
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, User]),
    PicturesModule, // Import PicturesModule so that PictureRepository is available
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
