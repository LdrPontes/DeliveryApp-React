import { UseCase } from "../../utils/UseCase";
import { ProductSection } from "../../entities/ProductSection";
import { IProductSectionRepository } from "../../repositories/remote/productSection/IProductSectionRepository";
import { ProductSectionRepository } from "../../../data/repositories/remote/productSection/ProductSectionRepository";

export class ReadProductSectionUseCase extends UseCase<ReadProductSectionResponse, ReadProductSectionParams> {
    
    repository: IProductSectionRepository = new ProductSectionRepository()

    async buildUseCase(params: ReadProductSectionParams): Promise<ReadProductSectionResponse> {
        const result =  await this.repository.read(params.enterprise_id)

        return new ReadProductSectionResponse(result)
    }

}

export class ReadProductSectionResponse {
    sections: ProductSection[]

    constructor(sections: ProductSection[]) {
        this.sections = sections
    }
}

export class ReadProductSectionParams {
    enterprise_id: number

    constructor(enterprise_id: number) {
        this.enterprise_id = enterprise_id
    }
}

