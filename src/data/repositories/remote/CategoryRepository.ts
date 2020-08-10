import { ICategoryRepository } from "../../../domain/repositories/remote/ICategoryRepository";
import { Category } from "../../../domain/entities/Category";
import api from "../utils/RemoteConnection";
import { AppError } from "../../../domain/utils/AppError";

export class CategoryRepository implements ICategoryRepository {

    async readAll(): Promise<Category[]> {
        try {

            const response: Category[] = (await api.get(`category/read`)).data

            return response
    
        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

}