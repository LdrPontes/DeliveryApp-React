
export class EnterpriseUser {

    id: number
    name: string
    telephone: string
    email: string
    password_hash: string

    constructor(id: number, name: string, telephone: string, email: string, password_hash: string) {
        this.id = id
        this.name = name
        this.telephone = telephone
        this.email = email
        this.password_hash = password_hash
    }


}