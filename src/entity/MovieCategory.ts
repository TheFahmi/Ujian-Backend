import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Movie } from "./Movie";
import { Category } from "./Category";

@Entity('movcat')
export class MovieCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "movieId" })
    movieId: number;

    @Column({ name: "categoryId" })
    categoryId: number;

    @ManyToOne(() => Movie, (movie) => movie.movieCategories)
    @JoinColumn({ name: "movieId" })
    movie: Movie;

    @ManyToOne(() => Category, (category) => category.movieCategories)
    @JoinColumn({ name: "categoryId" })
    category: Category;
}