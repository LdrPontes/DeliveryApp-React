import { UseCase } from "../../utils/UseCase";
import { ProductSection } from "../../entities/ProductSection";
import { IProductSectionRepository } from "../../repositories/remote/productSection/IProductSectionRepository";
import { ProductSectionRepository } from "../../../data/repositories/remote/productSection/ProductSectionRepository";

export class SaveProductSectionUseCase extends UseCase<SaveProductSectionResponse, SaveProductSectionParams> {
    
    repository: IProductSectionRepository = new ProductSectionRepository()

    async buildUseCase(params: SaveProductSectionParams): Promise<SaveProductSectionResponse> {
        const result =  await this.repository.save(params.name, params.enterprise_id)

        return new SaveProductSectionResponse(result)
    }

}

export class SaveProductSectionResponse {
    section: ProductSection

    constructor(section: ProductSection) {
        this.section = section
    }
}

export class SaveProductSectionParams {
    name: string
    enterprise_id: number

    constructor(name: string, enterprise_id: number) {
        this.name = name
        this.enterprise_id = enterprise_id
    }
}

