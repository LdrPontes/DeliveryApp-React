import { Product } from "../../entities/Product";

export interface IProductRepository {

    save(title: string,
        description: string,
        img: string,
        img_type: string,
        price: number,
        enterprise_id: number,
        product_section_id: number,
        optional_sections: number[]): Promise<Product>

    delete(id: number): Promise<boolean>

    update(id: number,
        title: string,
        description: string,
        img: string,
        img_type: string,
        price: number,
        product_section_id: number,
        optional_sections: number[]): Promise<Product>

}