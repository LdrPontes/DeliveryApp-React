export class Optional {
    id: number
    name: string
    price: number
    optional_section_id?: number

    constructor(id: number, name: string, price: number, optional_section_id?: number) {
        this.id = id
        this.name = name
        this.price = price
        this.optional_section_id = optional_section_id
    }
}