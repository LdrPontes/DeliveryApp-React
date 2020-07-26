export class Address {
    cep: string
    street: string
    district: string
    city: string
    uf: string
    num: number

    constructor(cep: string,
        street: string,
        district: string,
        city: string,
        uf: string,
        num: number) {
        this.cep = cep
        this.street = street
        this.district = district
        this.city = city
        this.uf = uf
        this.num = num
    }
}