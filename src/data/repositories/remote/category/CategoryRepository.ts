import { ICategoryRepository } from "../../../../domain/repositories/remote/category/ICategoryRepository";
import { Category } from "../../../../domain/entities/Category";
import api from "../../utils/RemoteConnection";

export class CategoryRepository implements ICategoryRepository {

    async readAll(): Promise<Category[]> {
        try {

            const response: Category[] = (await api.get(`category/read`)).data

            return response
    
        } catch (error) {
            throw error
        }
    }

}