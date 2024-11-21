import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Picture } from '../pictures/picture.entity';  // Import the Picture entity
import { Favorite } from '../favorites/favorite.entity';  // Import the Favorite entity

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // One-to-many relationship: A User can have many Pictures
  @OneToMany(() => Picture, picture => picture.user)
  pictures: Picture[];

  // One-to-many relationship: A User can have many Favorites
  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];
}
