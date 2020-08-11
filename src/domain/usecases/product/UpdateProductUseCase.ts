import { UseCase } from "../../utils/UseCase";
import { ProductRepository } from "../../../data/repositories/remote/ProductRepository";
import { IProductRepository } from "../../repositories/remote/IProductRepository";
import { Product } from "../../entities/Product";
export class UpdateProductUseCase extends UseCase<UpdateProductResponse, UpdateProductParams> {

    repository: IProductRepository = new ProductRepository()

    async buildUseCase(params: UpdateProductParams): Promise<UpdateProductResponse> {
        const result = await this.repository.update(params.id,
            params.title,
            params.description,
            params.img,
            params.img_type,
            params.price,
            params.product_section_id,
            params.optional_sections)

        return new UpdateProductResponse(result)
    }

}

export class UpdateProductResponse {
    product: Product

    constructor(product: Product) {
        this.product = product
    }
}

export class UpdateProductParams {
    id: number
    title: string
    description: string
    img: string
    img_type: string
    price: number
    product_section_id: number
    optional_sections: number[]

    constructor(id: number,
        title: string,
        description: string,
        img: string,
        img_type: string,
        price: number,
        product_section_id: number,
        optional_sections: number[]) {
        this.title = title
        this.description = description
        this.img = img
        this.img_type = img_type
        this.price = price
        this.product_section_id = product_section_id
        this.optional_sections = optional_sections
        this.id = id
    }
}
