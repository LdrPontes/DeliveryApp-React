import { UseCase } from "../../utils/UseCase";
import { OptionalSection } from "../../entities/OptionalSection";
import { IOptionalSectionRepository } from "../../repositories/remote/IOptionalSectionRepository";
import { OptionalSectionRepository } from "../../../data/repositories/remote/OptionalSectionRepository";

export class ReadOptionalSectionUseCase extends UseCase<ReadOptionalSectionResponse, ReadOptionalSectionParams> {
    
    repository: IOptionalSectionRepository = new OptionalSectionRepository()

    async buildUseCase(params: ReadOptionalSectionParams): Promise<ReadOptionalSectionResponse> {
        const result =  await this.repository.read(params.enterprise_id, params.search)

        return new ReadOptionalSectionResponse(result)
    }

}

export class ReadOptionalSectionResponse {
    sections: OptionalSection[]

    constructor(sections: OptionalSection[]) {
        this.sections = sections
    }
}

export class ReadOptionalSectionParams {
    enterprise_id: number
    search: string

    constructor(enterprise_id: number, search: string) {
        this.enterprise_id = enterprise_id
        this.search = search
    }
}

