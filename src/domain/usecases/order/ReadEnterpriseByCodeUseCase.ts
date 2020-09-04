import { UseCase } from "../../utils/UseCase"
import { IEnterpriseRepository } from "../../repositories/remote/IEnterpriseRepository"
import { EnterpriseRepository } from "../../../data/repositories/remote/EnterpriseRepository"
import { Enterprise } from "../../entities/Enterprise"

export class ReadEnterpriseByCodeUseCase extends UseCase<ReadEnterpriseByCodeResponse, ReadEnterpriseByCodeParams>{
    
    repository: IEnterpriseRepository = new EnterpriseRepository()

    async buildUseCase(params: ReadEnterpriseByCodeParams): Promise<ReadEnterpriseByCodeResponse> {
        const result = await this.repository.readByCode(params.code)

        return new ReadEnterpriseByCodeResponse(result)
    }

}

export class ReadEnterpriseByCodeResponse {
    enterprise: Enterprise

    constructor(enterprise: Enterprise) {
        this.enterprise = enterprise
    }
}

export class ReadEnterpriseByCodeParams {
    code: string

    constructor(code: string) {
        this.code = code
    }
}