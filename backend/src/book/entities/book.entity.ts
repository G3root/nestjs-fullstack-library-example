import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Author } from '../../author/entities/author.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ISBN: string;

  @Column()
  stock: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
