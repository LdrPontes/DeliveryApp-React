import { UseCase } from "../../utils/UseCase"
import { IProductRepository } from "../../repositories/remote/IProductRepository"
import { ProductRepository } from "../../../data/repositories/remote/ProductRepository"

export class DeleteProductUseCase extends UseCase<DeleteProductResponse, DeleteProductParams> {
    
    repository: IProductRepository = new ProductRepository()

    async buildUseCase(params: DeleteProductParams): Promise<DeleteProductResponse> {
        const result =  await this.repository.delete(params.id)

        return new DeleteProductResponse(result)
    }

}

export class DeleteProductResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class DeleteProductParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}