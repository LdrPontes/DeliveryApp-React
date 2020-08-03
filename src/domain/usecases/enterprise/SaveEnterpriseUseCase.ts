import { UseCase } from "../../utils/UseCase";
import { Enterprise } from "../../entities/Enterprise";
import { IEnterpriseRepository } from "../../repositories/remote/enterprise/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/remote/enterprise/EnterpriseRepository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/auth/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/auth/AuthEnterpriseRepositoryLocal";

export class SaveEnterpriseUseCase extends UseCase<SaveEnterpriseResponse, SaveEnterpriseParams> {

    repository: IEnterpriseRepository = new EnterpriseRepository()
    local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()

    async buildUseCase(params: SaveEnterpriseParams): Promise<SaveEnterpriseResponse> {

        const result = await this.repository.save(params.category_id,
            params.enterprise_id,
            params.name,
            params.document_type,
            params.document,
            params.img,
            params.img_type,
            params.address)

        const user = await this.local.getEnterpriseUser()
        
        if (user != null) {
            user.enterprise = result
            await this.local.saveEnterpriseUser(user)
        }



        return new SaveEnterpriseResponse(result)

    }

}

export class SaveEnterpriseResponse {
    enterprise: Enterprise

    constructor(enterprise: Enterprise) {
        this.enterprise = enterprise
    }
}
export class SaveEnterpriseParams {
    category_id: number
    enterprise_id: number
    name: string
    document_type: string
    document: string
    img: string
    img_type: string
    address: string

    constructor(category_id: number, enterprise_id: number, name: string, document_type: string, document: string, img: string, img_type: string, address: string) {
        this.enterprise_id = enterprise_id
        this.name = name
        this.document_type = document_type
        this.document = document
        this.img = img
        this.img_type = img_type
        this.address = address
        this.category_id = category_id
    }
}