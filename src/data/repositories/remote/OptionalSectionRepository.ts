import api from "../utils/RemoteConnection";
import { AppError } from "../../../domain/utils/AppError";
import { IOptionalSectionRepository } from "../../../domain/repositories/remote/IOptionalSectionRepository";
import { OptionalSection } from "../../../domain/entities/OptionalSection";

export class OptionalSectionRepository implements IOptionalSectionRepository {

    async save(name: string, enterprise_id: number, min: number, max: number): Promise<OptionalSection> {
        try {

            const response = await api.post('/section/optional/save', { name: name, enterprise_id: enterprise_id, min: min, max: max })

            return new OptionalSection(response.data.id, response.data.name, response.data.enterprise_id, response.data.min, response.data.max)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async read(enterprise_id: number, search: string): Promise<OptionalSection[]> {
        try {

            let params = ''
            if (search !== '') {
                params = `?search=${search}`
            }
            const response: OptionalSection[] = (await api.get(`/section/optional/read/${enterprise_id}${params}`)).data

            return response

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const response: boolean = (await api.delete(`/section/optional/delete/${id}`)).data.success

            return response

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }


    async update(id: number, name: string, min: number, max: number): Promise<OptionalSection> {
        try {

            const response = await api.put('/section/optional/update', { name: name, id: id, min: min, max: max})

            return new OptionalSection(response.data.id, response.data.name, response.data.enterprise_id, response.data.min, response.data.max)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }
}