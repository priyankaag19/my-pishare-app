import { Controller, Get, Post, Body, Query, UseGuards, InternalServerErrorException } from '@nestjs/common'; // Import InternalServerErrorException
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPicture(@Body() pictureData: { userId: number; url: string; title: string }) {
    console.log('Adding picture:', pictureData);
    try {
      return await this.picturesService.addPicture(pictureData);
    } catch (error) {
      console.error('Error in addPicture:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserPictures(@Query('userId') userId: string) {
    try {
      return await this.picturesService.getUserPictures(Number(userId));
    } catch (error) {
      console.error('Error fetching pictures:', error);
      throw new InternalServerErrorException('Failed to fetch pictures'); // InternalServerErrorException used here
    }
  }

  @Get('all')
  async getAllPictures() {
    console.log('Fetching all pictures...');
    try {
      return await this.picturesService.getAllPictures();
    } catch (error) {
      console.error('Error in getAllPictures:', error);
      throw error;
    }
  }
}
