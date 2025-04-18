import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MovieCategory } from "./MovieCategory";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    nama: string;

    @OneToMany(() => MovieCategory, (movieCategory) => movieCategory.category)
    movieCategories: MovieCategory[];
} 