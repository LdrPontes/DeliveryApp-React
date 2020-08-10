import { UseCase } from "../../utils/UseCase";
import { Address } from "../../entities/Address";
import { IAddressRepository } from "../../repositories/remote/IAddressRepository";
import { AddressRepository } from "../../../data/repositories/remote/AddressRepository";

export class GetAddressUseCase extends UseCase<GetAddressResponse, GetAddressParams>{
    
    repository: IAddressRepository = new AddressRepository()

    async buildUseCase(params: GetAddressParams): Promise<GetAddressResponse> {
        try {
            const result = await this.repository.getAddress(params.cep)

            return new GetAddressResponse(result)
        } catch (error) {
            throw error
        }
    }

}


export class GetAddressResponse {
    address: Address

    constructor(address: Address) {
        this.address = address
    }
}

export class GetAddressParams {
    cep: string

    constructor(cep: string) {
        this.cep = cep
    }
}