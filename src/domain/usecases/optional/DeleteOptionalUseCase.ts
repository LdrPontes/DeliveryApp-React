import { UseCase } from "../../utils/UseCase"
import { IOptionalRepository } from "../../repositories/remote/IOptionalRepository"
import { OptionalRepository } from "../../../data/repositories/remote/OptionalRepository"

export class DeleteOptionalUseCase extends UseCase<DeleteOptionalResponse, DeleteOptionalParams> {
    
    repository: IOptionalRepository = new OptionalRepository()

    async buildUseCase(params: DeleteOptionalParams): Promise<DeleteOptionalResponse> {
        const result =  await this.repository.delete(params.id)

        return new DeleteOptionalResponse(result)
    }

}

export class DeleteOptionalResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class DeleteOptionalParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}