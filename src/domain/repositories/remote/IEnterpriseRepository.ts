import { Enterprise } from "../../entities/Enterprise";

export interface IEnterpriseRepository {
    update(id: number, name: string, address: string, category_id: number, img?: string, img_type?: string): Promise<Enterprise>
    save(category_id: number, enterprise_id: number, name: string, document_type: string, document: string, img: string, img_type: string, address: string): Promise<Enterprise>
}