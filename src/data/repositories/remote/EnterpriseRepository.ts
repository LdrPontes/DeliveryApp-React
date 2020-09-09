import { IEnterpriseRepository } from "../../../domain/repositories/remote/IEnterpriseRepository";
import api from "../utils/RemoteConnection";
import { Enterprise } from "../../../domain/entities/Enterprise";
import { AppError } from "../../../domain/utils/AppError";
import { EnterpriseSettings } from "../../../domain/entities/EnterpriseSettings";
import { EnterpriseCatalog } from "../../../domain/entities/EnterpriseCatalog";

export class EnterpriseRepository implements IEnterpriseRepository {

    async save(category_id: number, enterprise_id: number, name: string, document_type: string, document: string, img: string, img_type: string, address: string): Promise<Enterprise> {
        try {

            const response = await api.post('/enterprise/save', {
                category_id: category_id,
                enterprise_id: enterprise_id,
                name: name,
                document_type: document_type,
                document: document,
                img: img,
                img_type: img_type,
                address: address
            })

            const enterprise = new Enterprise(response.data.id,
                response.data.category_id,
                response.data.name,
                response.data.document_type,
                response.data.document,
                response.data.logo_url,
                response.data.address,
                response.data.settings,
                response.data.code)

            enterprise.catalog = response.data.catalog
            
            return enterprise

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async update(id: number, name: string, address: string, category_id: number, img?: string, img_type?: string): Promise<Enterprise> {
        try {

            const response = await api.put('/enterprise/update', {
                category_id: category_id,
                id: id,
                name: name,
                img: img,
                img_type: img_type,
                address: address
            })

            return new Enterprise(response.data.id,
                response.data.category_id,
                response.data.name,
                response.data.document_type,
                response.data.document,
                response.data.logo_url,
                response.data.address,
                response.data.settings,
                response.data.code)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async updateSettings(id: number, settings: EnterpriseSettings): Promise<boolean> {
        try {

            const response = await api.put('/enterprise/update/settings', {
                id: id,
                settings: settings
            })

            return response.data.success

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async updateCatalog(id: number, catalog: EnterpriseCatalog, code: string): Promise<boolean> {
        try {

            const response = await api.put('/enterprise/update/catalog', {
                id: id,
                catalog: catalog,
                code: code
            })

            return response.data.success

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }


    async readByCode(code: string): Promise<Enterprise> {
        try {

            const response = await api.get(`/enterprise/read/code/${code}`)

            return response.data

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

}