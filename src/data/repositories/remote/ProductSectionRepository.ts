import { IProductSectionRepository } from "../../../domain/repositories/remote/IProductSectionRepository";
import { ProductSection } from "../../../domain/entities/ProductSection";
import api from "../utils/RemoteConnection";
import { AppError } from "../../../domain/utils/AppError";

export class ProductSectionRepository implements IProductSectionRepository {

    async save(name: string, enterprise_id: number): Promise<ProductSection> {
        try {

            const response = await api.post('/section/product/save', { name: name, enterprise_id: enterprise_id })

            return new ProductSection(response.data.id, response.data.name, response.data.enterprise_id, response.data.products === null ? [] : response.data.products)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async read(enterprise_id: number, search: string): Promise<ProductSection[]> {
        try {

            let params = ''
            if(search !== ''){
                params = `?search=${search}`
            }
            const response: ProductSection[] = (await api.get(`/section/product/read/${enterprise_id}${params}`)).data

            return response

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const response: boolean = (await api.delete(`/section/product/delete/${id}`)).data.success

            return response

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }
    
    
    async update(id: number, name: string): Promise<ProductSection> {
        try {

            const response = await api.put('/section/product/update', { name: name, id: id })

            return new ProductSection(response.data.id, response.data.name, response.data.enterprise_id, response.data.products === null ? [] : response.data.products)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }
}