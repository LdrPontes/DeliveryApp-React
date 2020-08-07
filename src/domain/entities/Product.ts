export class Product {
    id: number
    title: string
    description: string
    img_url: string
    price: number
    enterprise_id: number
    product_section_id: number


    constructor(id: number,
        title: string,
        description: string,
        img_url: string,
        price: number,
        enterprise_id: number,
        product_section_id: number) {
        this.id = id
        this.title = title
        this.description = description
        this.img_url = img_url
        this.price = price
        this.enterprise_id = enterprise_id
        this.product_section_id = product_section_id

    }
}