import { UseCase } from "../../utils/UseCase";
import { Optional } from "../../entities/Optional";
import { IOptionalRepository } from "../../repositories/remote/IOptionalRepository";
import { OptionalRepository } from "../../../data/repositories/remote/OptionalRepository";

export class SaveOptionalUseCase extends UseCase<SaveOptionalResponse, SaveOptionalParams> {
    
    repository: IOptionalRepository = new OptionalRepository()

    async buildUseCase(params: SaveOptionalParams): Promise<SaveOptionalResponse> {
        const result =  await this.repository.save(params.name, params.enterprise_id, params.optional_section_id, params.price)

        return new SaveOptionalResponse(result)
    }

}

export class SaveOptionalResponse {
    optional: Optional

    constructor(optional: Optional) {
        this.optional = optional
    }
}

export class SaveOptionalParams {
    name: string
    enterprise_id: number
    optional_section_id: number
    price: number

    constructor(name: string, enterprise_id: number, optional_section_id: number, price: number) {
        this.name = name
        this.enterprise_id = enterprise_id
        this.optional_section_id = optional_section_id
        this.price = price
    }
}

