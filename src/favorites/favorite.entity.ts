import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';  // Import the User entity
import { Picture } from '../pictures/picture.entity';  // Import the Picture entity

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  // Many-to-one relationship: A Favorite belongs to a User
  @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // Many-to-one relationship: A Favorite belongs to a Picture
  @ManyToOne(() => Picture, picture => picture.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pictureId' })
  picture: Picture;
}
