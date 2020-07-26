import { Address } from "../../../entities/Address";

export interface IAddressRepository {
    getAddress(cep: string): Promise<Address>
}