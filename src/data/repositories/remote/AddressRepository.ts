import { IAddressRepository } from "../../../domain/repositories/remote/IAddressRepository";
import { Address } from "../../../domain/entities/Address";
import { instance } from "../utils/RemoteConnection";

export class AddressRepository implements IAddressRepository {
    async getAddress(cep: string): Promise<Address> {
        try {
        
            const response = await instance.get(`https://viacep.com.br/ws/${cep}/json/`)

            return new Address(response.data.cep, response.data.logradouro, response.data.bairro, response.data.localidade, response.data.uf, -1)
        
        } catch (error) {
            throw error
        }
    }

}