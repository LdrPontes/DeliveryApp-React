import { UseCase } from "../../utils/UseCase";
import { Enterprise } from "../../entities/Enterprise";
import { IEnterpriseRepository } from "../../repositories/remote/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/remote/EnterpriseRepository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/AuthEnterpriseRepositoryLocal";

export class UpdateEnterpriseUseCase extends UseCase<UpdateEnterpriseResponse, UpdateEnterpriseParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()
    local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()
    
    async buildUseCase(params: UpdateEnterpriseParams): Promise<UpdateEnterpriseResponse> {
        try {

            const result = await this.repository.update(params.id, params.name, params.address, params.category_id, params.img, params.img_type)
            
            const user = await this.local.getEnterpriseUser()
        
            if (user != null) {
                user.enterprise = result
                await this.local.saveEnterpriseUser(user)
            }
            return new UpdateEnterpriseResponse(result)

        } catch (error) {
            throw error
        }
    }

}

export class UpdateEnterpriseResponse {
    enterprise: Enterprise

    constructor(enterprise: Enterprise) {
        this.enterprise = enterprise
    }
}

export class UpdateEnterpriseParams {
    id: number
    name: string
    img?: string
    img_type?: string
    address: string
    category_id: number

    constructor(id: number, name: string, address: string, category_id: number, img?: string, img_type?: string) {
        this.id = id
        this.name = name
        this.img = img
        this.img_type = img_type
        this.address = address
        this.category_id = category_id
    }
}