import { UseCase } from "../../utils/UseCase";
import { OptionalSection } from "../../entities/OptionalSection";
import { IOptionalSectionRepository } from "../../repositories/remote/IOptionalSectionRepository";
import { OptionalSectionRepository } from "../../../data/repositories/remote/OptionalSectionRepository";

export class UpdateOptionalSectionUseCase extends UseCase<UpdateOptionalSectionResponse, UpdateOptionalSectionParams> {

    repository: IOptionalSectionRepository = new OptionalSectionRepository()

    async buildUseCase(params: UpdateOptionalSectionParams): Promise<UpdateOptionalSectionResponse> {
        const result = await this.repository.update(params.id, params.name, params.min, params.max)

        return new UpdateOptionalSectionResponse(result)
    }

}

export class UpdateOptionalSectionResponse {
    section: OptionalSection

    constructor(section: OptionalSection) {
        this.section = section
    }
}

export class UpdateOptionalSectionParams {
    id: number
    name: string
    min: number
    max: number

    constructor(id: number, name: string, min: number, max: number) {
        this.id = id
        this.name = name
        this.min = min
        this.max = max
    }
}
