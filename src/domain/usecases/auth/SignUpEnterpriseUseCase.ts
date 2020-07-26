import { UseCase } from "../../utils/UseCase";
import { IAuthEnterpriseRepository } from "../../repositories/remote/auth/IAuthEnterpriseRepository";
import { AuthEnterpriseRepository } from "../../../data/repositories/remote/auth/AuthEnterpriseRespository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/auth/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/auth/AuthEnterpriseRepositoryLocal";
import { EnterpriseUser } from "../../entities/EnterpriseUser";

export class SignUpEnterpriseUseCase extends UseCase<SignUpEnterpriseResponse, SignUpEnterpriseParams>{
    repository: IAuthEnterpriseRepository = new AuthEnterpriseRepository()
    local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()

    async buildUseCase(params: SignUpEnterpriseParams): Promise<SignUpEnterpriseResponse> {
        try {
            const result = await this.repository.signUpEnterprise(params.name, params.telephone, params.email, params.password)

            this.local.saveEnterpriseUser(result[0])

            this.local.saveToken(result[1])

            return new SignUpEnterpriseResponse(result[0])
        } catch (error) {
            throw error
        }
    }
}


export class SignUpEnterpriseResponse {
    user: EnterpriseUser

    constructor(user: EnterpriseUser) {
        this.user = user
    }
}

export class SignUpEnterpriseParams {
    name: string
    telephone: string
    email: string
    password: string

    constructor(name: string, telephone: string, email: string, password: string) {
        this.name = name
        this.telephone = telephone
        this.email = email
        this.password = password
    }
}