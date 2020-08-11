import { IProductRepository } from "../../../domain/repositories/remote/IProductRepository";
import { Product } from "../../../domain/entities/Product";
import api from "../utils/RemoteConnection";
import { AppError } from "../../../domain/utils/AppError";

export class ProductRepository implements IProductRepository {



    async save(title: string, description: string, img: string, img_type: string, price: number, enterprise_id: number, product_section_id: number, optional_sections: number[]): Promise<Product> {
        try {

            const response = await api.post('/product/save', {
                title: title,
                description: description,
                img: img,
                img_type: img_type,
                price: price,
                enterprise_id: enterprise_id,
                product_section_id: product_section_id,
                optional_sections: optional_sections
            })

            return new Product(response.data.id,
                response.data.title,
                response.data.description,
                response.data.img,
                response.data.price,
                response.data.enterprise_id,
                response.data.product_section_id,
                response.data.optional_sections)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const response: boolean = (await api.delete(`/product/delete/${id}`)).data.success

            return response

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

    async update(id: number, title: string, description: string, img: string, img_type: string, price: number, product_section_id: number, optional_sections: number[]): Promise<Product> {
        try {

            const response = await api.put('/product/update', {
                id: id,
                title: title,
                description: description,
                img: img,
                img_type: img_type,
                price: price,
                product_section_id: product_section_id,
                optional_sections: optional_sections
            })

            return new Product(response.data.id,
                response.data.title,
                response.data.description,
                response.data.img,
                response.data.price,
                response.data.enterprise_id,
                response.data.product_section_id,
                response.data.optional_sections)

        } catch (error) {
            throw new AppError(error.response.data.status, error.response.data.name, error.response.data.message)
        }
    }

}