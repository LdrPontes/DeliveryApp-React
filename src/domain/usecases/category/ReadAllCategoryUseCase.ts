import { Category } from "../../entities/Category"
import { UseCase } from "../../utils/UseCase"
import { ICategoryRepository } from "../../repositories/remote/ICategoryRepository"
import { CategoryRepository } from "../../../data/repositories/remote/CategoryRepository"

export class ReadAllCategoryUseCase extends UseCase<ReadAllCategoryResponse, void> {

    repository: ICategoryRepository = new CategoryRepository()
    
    async buildUseCase(params: void): Promise<ReadAllCategoryResponse> {
        
        const result =  await this.repository.readAll()

        return new ReadAllCategoryResponse(result)
    }

}

export class ReadAllCategoryResponse {
    categories: Category[]

    constructor(categories: Category[]) {
        this.categories = categories
    }
}