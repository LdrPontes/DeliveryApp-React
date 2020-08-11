import { UseCase } from "../../utils/UseCase";
import { Product } from "../../entities/Product";
import { ProductRepository } from "../../../data/repositories/remote/ProductRepository";
import { IProductRepository } from "../../repositories/remote/IProductRepository";


export class SaveProductUseCase extends UseCase<SaveProductResponse, SaveProductParams> {
    repository: IProductRepository = new ProductRepository()
    
    async buildUseCase(params: SaveProductParams): Promise<SaveProductResponse> {
        const result = await this.repository.save(params.title, params.description, params.img, params.img_type, params.price, params.enterprise_id, params.product_section_id, params.optional_sections)
        
        return new SaveProductResponse(result)
    }

}

export class SaveProductResponse {
    product: Product

    constructor(product: Product) {
        this.product = product
    }
}

export class SaveProductParams {
    title: string
    description: string
    img: string
    img_type: string
    price: number
    enterprise_id: number
    product_section_id: number
    optional_sections: number[]

    constructor(title: string,
        description: string,
        img: string,
        img_type: string,
        price: number,
        enterprise_id: number,
        product_section_id: number,
        optional_sections: number[]) {
        this.title = title
        this.description = description
        this.img = img
        this.img_type = img_type
        this.price = price
        this.enterprise_id = enterprise_id
        this.product_section_id = product_section_id
        this.optional_sections = optional_sections

    }
}