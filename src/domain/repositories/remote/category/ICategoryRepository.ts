import { Category } from "../../../entities/Category";

export interface ICategoryRepository {
    readAll(): Promise<Category[]>
}