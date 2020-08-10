import { UseCase } from "../../utils/UseCase";
import { IAuthEnterpriseRepository } from "../../repositories/remote/IAuthEnterpriseRepository";
import { AuthEnterpriseRepository } from "../../../data/repositories/remote/AuthEnterpriseRespository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/AuthEnterpriseRepositoryLocal";
import { EnterpriseUser } from "../../entities/EnterpriseUser";

export class SignInEnterpriseUseCase extends UseCase<SignInEnterpriseResponse, SignInEnterpriseParams>{
    repository: IAuthEnterpriseRepository = new AuthEnterpriseRepository()
    local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()

    async buildUseCase(params: SignInEnterpriseParams): Promise<SignInEnterpriseResponse> {
        try {
            const result = await this.repository.signInEnterprise(params.email, params.password)

            await this.local.saveEnterpriseUser(result[0])

            await this.local.saveToken(result[1])

            return new SignInEnterpriseResponse(result[0])
        } catch (error) {
            throw error
        }
    }
}


export class SignInEnterpriseResponse {
    user: EnterpriseUser

    constructor(user: EnterpriseUser) {
        this.user = user
    }
}

export class SignInEnterpriseParams {
    email: string
    password: string

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}