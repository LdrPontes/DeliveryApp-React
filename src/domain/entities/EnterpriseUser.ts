import { Enterprise } from './Enterprise'

export class EnterpriseUser {

    id: number
    name: string
    telephone: string
    email: string
    password_hash: string
    enterprise: Enterprise | null

    constructor(id: number, name: string, telephone: string, email: string, password_hash: string, enterprise: Enterprise | null) {
        this.id = id
        this.name = name
        this.telephone = telephone
        this.email = email
        this.password_hash = password_hash
        this.enterprise = enterprise
    }


}