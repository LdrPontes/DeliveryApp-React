import { UseCase } from "../../utils/UseCase";
import { EnterpriseUser } from "../../entities/EnterpriseUser";
import { IEnterpriseUserRepository } from "../../repositories/remote/IEnterpriseUserRepository";
import { EnterpriseUserRepository } from "../../../data/repositories/remote/EnterpriseUserRepository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/AuthEnterpriseRepositoryLocal";

export class UpdateEnterpriseUserUseCase extends UseCase<UpdateEnterpriseUserResponse, UpdateEnterpriseUserParams>{
    private repository: IEnterpriseUserRepository = new EnterpriseUserRepository()
    private local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()

    async buildUseCase(params: UpdateEnterpriseUserParams): Promise<UpdateEnterpriseUserResponse> {
        try {
            const result = await this.repository.update(params.id, params.name, params.telephone, params.email, params.password)
            
            await this.local.saveEnterpriseUser(result)

            return new UpdateEnterpriseUserResponse(result)
        } catch (error) {
            throw error
        }

    }

}

export class UpdateEnterpriseUserParams {
    id: number
    name: string
    telephone: string
    email: string
    password: string | undefined

    constructor(id: number, name: string, telephone: string, email: string, password?: string) {
        this.id = id
        this.name = name
        this.telephone = telephone
        this.email = email
        this.password = password
    }

}

export class UpdateEnterpriseUserResponse {
    enterpriseUser: EnterpriseUser

    constructor(enterpriseUser: EnterpriseUser) {
        this.enterpriseUser = enterpriseUser;
    }
}