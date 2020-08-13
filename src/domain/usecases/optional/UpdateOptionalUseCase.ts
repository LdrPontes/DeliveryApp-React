import { UseCase } from "../../utils/UseCase";
import { Optional } from "../../entities/Optional";
import { IOptionalRepository } from "../../repositories/remote/IOptionalRepository";
import { OptionalRepository } from "../../../data/repositories/remote/OptionalRepository";

export class UpdateOptionalUseCase extends UseCase<UpdateOptionalResponse, UpdateOptionalParams> {
    
    repository: IOptionalRepository = new OptionalRepository()

    async buildUseCase(params: UpdateOptionalParams): Promise<UpdateOptionalResponse> {
        const result =  await this.repository.update(params.id, params.name, params.price)

        return new UpdateOptionalResponse(result)
    }

}

export class UpdateOptionalResponse {
    optional: Optional

    constructor(optional: Optional) {
        this.optional = optional
    }
}

export class UpdateOptionalParams {
    name: string
    id: number
    price: number

    constructor(id: number, name: string, price: number) {
        this.name = name
        this.id = id
        this.price = price
    }
}

