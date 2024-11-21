import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addToFavorites(@Body() favoriteData: AddFavoriteDto) {
    return this.favoritesService.addToFavorites(favoriteData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeFromFavorites(@Body() favoriteData: AddFavoriteDto) {
    return this.favoritesService.removeFromFavorites(favoriteData);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getUserFavorites(Number(userId)); // Convert to number
  }
}
