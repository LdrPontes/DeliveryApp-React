import { IOptionalRepository } from "../../../domain/repositories/remote/IOptionalRepository";
import { Optional } from "../../../domain/entities/Optional";
import api from "../utils/RemoteConnection";
import { AppError } from "../../../domain/utils/AppError";

export class OptionalRepository implements IOptionalRepository {

    async save(name: string, enterprise_id: number, section_id: number, price: number): Promise<Optional> {
        try {

            const response = await api.post('/optional/save', {
                name: name,
                price: price,
                enterprise_id: enterprise_id,
                section_id: section_id,

            })

            return new Optional(response.data.id,
                response.data.name,
                response.data.price)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const response: boolean = (await api.delete(`/optional/delete/${id}`)).data.success

            return response

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async update(id: number, name: string, price: number): Promise<Optional> {
        try {

            const response = await api.put('/optional/update', {
                id: id,
                name: name,
                price: price,
            })

            return new Optional(response.data.id,
                response.data.name,
                response.data.price)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

}