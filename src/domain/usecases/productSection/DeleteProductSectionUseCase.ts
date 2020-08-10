import { UseCase } from "../../utils/UseCase"
import { IProductSectionRepository } from "../../repositories/remote/IProductSectionRepository"
import { ProductSectionRepository } from "../../../data/repositories/remote/ProductSectionRepository"

export class DeleteProductSectionUseCase extends UseCase<DeleteProductSectionResponse, DeleteProductSectionParams> {
    
    repository: IProductSectionRepository = new ProductSectionRepository()

    async buildUseCase(params: DeleteProductSectionParams): Promise<DeleteProductSectionResponse> {
        const result =  await this.repository.delete(params.id)

        return new DeleteProductSectionResponse(result)
    }

}

export class DeleteProductSectionResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class DeleteProductSectionParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}