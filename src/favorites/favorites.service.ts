import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Picture } from '../pictures/picture.entity';
import { Favorite } from './favorite.entity';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,

    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addToFavorites(favoriteData: AddFavoriteDto) {
    const { userId, pictureId } = favoriteData;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const picture = await this.picturesRepository.findOne({ where: { id: pictureId } });
    if (!picture) throw new NotFoundException('Picture not found');

    const existingFavorite = await this.favoritesRepository.findOne({
      where: { user, picture },
    });
    if (existingFavorite) return { message: 'Picture is already in favorites' };

    const favorite = this.favoritesRepository.create({ user, picture });
    await this.favoritesRepository.save(favorite);

    return { message: 'Added to favorites', favoriteId: favorite.id };
  }

  async removeFromFavorites(favoriteData: AddFavoriteDto) {
    const { userId, pictureId } = favoriteData;

    const favorite = await this.favoritesRepository.findOne({
      where: { user: { id: userId }, picture: { id: pictureId } },
    });

    if (!favorite) throw new NotFoundException('Favorite not found');

    await this.favoritesRepository.delete(favorite.id);
    return { message: 'Removed from favorites' };
  }

  async getUserFavorites(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const favorites = await this.favoritesRepository.find({
      where: { user },
      relations: ['picture', 'picture.user'],
      order: { id: 'DESC' },
    });

    return favorites.map(fav => ({
      pictureId: fav.picture.id,
      url: fav.picture.url,
      title: fav.picture.title,
      createdAt: fav.picture.createdAt,
      username: fav.picture.user.username,
    }));
  }
}
