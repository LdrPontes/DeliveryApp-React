import { UseCase } from "../../utils/UseCase";
import { IEnterpriseRepository } from "../../repositories/remote/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/remote/EnterpriseRepository";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/AuthEnterpriseRepositoryLocal";
import { EnterpriseSettings } from "../../entities/EnterpriseSettings";

export class UpdateEnterpriseSettingsUseCase extends UseCase<UpdateEnterpriseSettingsResponse, UpdateEnterpriseSettingsParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()
    local: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()

    async buildUseCase(params: UpdateEnterpriseSettingsParams): Promise<UpdateEnterpriseSettingsResponse> {
        try {

            const result = await this.repository.updateSettings(params.id, params.settings)

            const user = await this.local.getEnterpriseUser()

            if (user != null) {
                if (user.enterprise != null && result) {
                    user.enterprise.settings = JSON.stringify(params.settings)
                    await this.local.saveEnterpriseUser(user)
                }
            }
            return new UpdateEnterpriseSettingsResponse(result)

        } catch (error) {
            throw error
        }
    }

}

export class UpdateEnterpriseSettingsResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class UpdateEnterpriseSettingsParams {
    id: number
    settings: EnterpriseSettings

    constructor(id: number, settings: EnterpriseSettings) {
        this.id = id
        this.settings = settings
    }
}