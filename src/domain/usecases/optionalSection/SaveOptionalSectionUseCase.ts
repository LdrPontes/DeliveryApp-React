import { UseCase } from "../../utils/UseCase";
import { OptionalSection } from "../../entities/OptionalSection";
import { IOptionalSectionRepository } from "../../repositories/remote/IOptionalSectionRepository";
import { OptionalSectionRepository } from "../../../data/repositories/remote/OptionalSectionRepository";

export class SaveOptionalSectionUseCase extends UseCase<SaveOptionalSectionResponse, SaveOptionalSectionParams> {
    
    repository: IOptionalSectionRepository = new OptionalSectionRepository()

    async buildUseCase(params: SaveOptionalSectionParams): Promise<SaveOptionalSectionResponse> {
        const result =  await this.repository.save(params.name, params.enterprise_id, params.min, params.max)

        return new SaveOptionalSectionResponse(result)
    }

}

export class SaveOptionalSectionResponse {
    section: OptionalSection

    constructor(section: OptionalSection) {
        this.section = section
    }
}

export class SaveOptionalSectionParams {
    name: string
    enterprise_id: number
    min: number
    max: number

    constructor(name: string, enterprise_id: number, min: number, max: number) {
        this.name = name
        this.enterprise_id = enterprise_id
        this.min = min
        this.max = max
    }
}

