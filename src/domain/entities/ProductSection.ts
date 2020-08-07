import { Product } from "./Product"

export class ProductSection {
    id: number
    name: string
    enterprise_id: number
    products: Product[]


    constructor(id: number,
        name: string,
        enterprise_id: number,
        products: Product[]) {
        this.id = id
        this.name = name
        this.enterprise_id = enterprise_id
        this.products = products
    }
}