import { UseCase } from "../../utils/UseCase"
import { IOptionalSectionRepository } from "../../repositories/remote/IOptionalSectionRepository"
import { OptionalSectionRepository } from "../../../data/repositories/remote/OptionalSectionRepository"

export class DeleteOptionalSectionUseCase extends UseCase<DeleteOptionalSectionResponse, DeleteOptionalSectionParams> {
    
    repository: IOptionalSectionRepository = new OptionalSectionRepository()

    async buildUseCase(params: DeleteOptionalSectionParams): Promise<DeleteOptionalSectionResponse> {
        const result =  await this.repository.delete(params.id)

        return new DeleteOptionalSectionResponse(result)
    }

}

export class DeleteOptionalSectionResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class DeleteOptionalSectionParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}