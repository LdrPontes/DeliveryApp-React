import { Optional } from "./Optional"

export class OptionalSection {
    id: number
    name: string
    enterprise_id: number
    min: number
    max: number
    products?: Optional[]

    constructor(id: number,
        name: string,
        enterprise_id: number,
        min: number,
        max: number, products?: Optional[]) {
        this.id = id
        this.name = name
        this.enterprise_id = enterprise_id
        this.max = max
        this.min = min
        this.products = products
    }

}