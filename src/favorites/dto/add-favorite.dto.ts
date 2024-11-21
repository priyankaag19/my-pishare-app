import { IsNumber } from 'class-validator';

export class AddFavoriteDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  pictureId: number;
}
