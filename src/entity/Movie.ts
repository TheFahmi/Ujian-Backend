import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MovieCategory } from "./MovieCategory";

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    nama: string;

    @Column({ type: "varchar", length: 4 })
    tahun: string;

    @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.movie)
    movieCategories: MovieCategory[];
}