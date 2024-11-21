import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Picture } from './picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addPicture(pictureData: { userId: number; url: string; title: string }) {
    console.log('Received picture data:', pictureData);
    const { userId, url, title } = pictureData;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      console.error('User not found for userId:', userId);
      throw new NotFoundException('User not found');
    }

    const picture = this.picturesRepository.create({ user, url, title });
    await this.picturesRepository.save(picture);
        return { message: 'Picture added successfully', pictureId: picture.id };
  }

  async getUserPictures(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      console.error('User not found for userId:', userId);
      throw new NotFoundException('User not found');
    }

    const pictures = await this.picturesRepository.find({
      where: { user },
      order: { createdAt: 'DESC' },
    });

    return pictures.map(picture => ({
      id: picture.id,
      url: picture.url,
      title: picture.title,
      createdAt: picture.createdAt,
    }));
  }

  async getAllPictures() {
    const pictures = await this.picturesRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return pictures.map(picture => ({
      id: picture.id,
      url: picture.url,
      title: picture.title,
      createdAt: picture.createdAt,
      username: picture.user?.username,
    }));
  }
}
