import { EnterpriseUser } from "../../entities/EnterpriseUser";
import { UseCase } from "../../utils/UseCase";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/AuthEnterpriseRepositoryLocal";

export class GetSavedEnterpriseUserUseCase extends UseCase<GetSavedEnterpriseUserResponse, void>{

    repository: IAuthEnterpriseRepositoryLocal = new AuthEnterpriseRepositoryLocal()

    async buildUseCase(params: void): Promise<GetSavedEnterpriseUserResponse> {

        return new GetSavedEnterpriseUserResponse(await this.repository.getEnterpriseUser())
    }

}

export class GetSavedEnterpriseUserResponse {
    user: EnterpriseUser | null

    constructor(user: EnterpriseUser | null) {
        this.user = user
    }
}