import { UseCase } from "../../utils/UseCase";
import { ProductSection } from "../../entities/ProductSection";
import { IProductSectionRepository } from "../../repositories/remote/IProductSectionRepository";
import { ProductSectionRepository } from "../../../data/repositories/remote/ProductSectionRepository";

export class UpdateProductSectionUseCase extends UseCase<UpdateProductSectionResponse, UpdateProductSectionParams> {
    
    repository: IProductSectionRepository = new ProductSectionRepository()

    async buildUseCase(params: UpdateProductSectionParams): Promise<UpdateProductSectionResponse> {
        const result =  await this.repository.update(params.id, params.name)

        return new UpdateProductSectionResponse(result)
    }

}

export class UpdateProductSectionResponse {
    section: ProductSection

    constructor(section: ProductSection) {
        this.section = section
    }
}

export class UpdateProductSectionParams {
    name: string
    id: number

    constructor( id: number, name: string) {
        this.name = name
        this.id = id
    }
}

