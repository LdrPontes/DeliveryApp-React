
export class Enterprise {

    id: number;
    name: string
    cnpj: string
    cpf: string
    logo_url: string

    constructor(id: number, name: string, cnpj: string, cpf: string, logo_url: string){
        this.id = id
        this.name = name
        this.cnpj = cnpj
        this.cpf = cpf
        this.logo_url = logo_url
    }
}