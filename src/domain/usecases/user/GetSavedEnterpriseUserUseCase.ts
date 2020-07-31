import { EnterpriseUser } from "../../entities/EnterpriseUser";
import { UseCase } from "../../utils/UseCase";
import { IAuthEnterpriseRepositoryLocal } from "../../repositories/local/auth/IAuthEnterpriseRepositoryLocal";
import { AuthEnterpriseRepositoryLocal } from "../../../data/repositories/local/auth/AuthEnterpriseRepositoryLocal";

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