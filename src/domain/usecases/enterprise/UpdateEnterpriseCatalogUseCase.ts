import { UseCase } from "../../utils/UseCase";
import { EnterpriseCatalog } from "../../entities/EnterpriseCatalog";
import { IEnterpriseRepository } from "../../repositories/remote/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/remote/EnterpriseRepository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/AuthEnterpriseRepositoryLocal";

export class UpdateEnterpriseCatalogUseCase extends UseCase<UpdateEnterpriseCatalogResponse, UpdateEnterpriseCatalogParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()
    local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()
    
    async buildUseCase(params: UpdateEnterpriseCatalogParams): Promise<UpdateEnterpriseCatalogResponse> {
        try {
            
            const result = await this.repository.updateCatalog(params.id, params.catalog, params.code)


            const user = await this.local.getEnterpriseUser()

            if (user != null) {
                if (user.enterprise != null && result) {
                    user.enterprise.catalog = JSON.stringify(params.catalog)
                    user.enterprise.code = params.code
                    await this.local.saveEnterpriseUser(user)
                }
            }

            return new UpdateEnterpriseCatalogResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateEnterpriseCatalogResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class UpdateEnterpriseCatalogParams {
    catalog: EnterpriseCatalog
    code: string
    id: number

    constructor(id: number, catalog: EnterpriseCatalog, code: string) {
        this.id = id
        this.catalog = catalog
        this.code = code
    }
}