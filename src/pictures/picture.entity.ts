import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.pictures, { eager: true })
  user: User;

  @OneToMany(() => Favorite, favorite => favorite.picture)
  favorites: Favorite[];
}
