import { EnterpriseSettings } from "./EnterpriseSettings"

export class Enterprise {

    id: number
    category_id: number
    name: string
    document_type: string
    document: string
    logo_url: string
    address: string
    settings: EnterpriseSettings | string

    constructor(id: number, category_id: number, name: string, document_type: string, document: string, logo_url: string, address: string, settings: EnterpriseSettings | string){
        this.id = id
        this.name = name
        this.document_type = document_type
        this.document = document
        this.logo_url = logo_url
        this.address = address
        this.category_id = category_id
        this.settings = settings
    }
}