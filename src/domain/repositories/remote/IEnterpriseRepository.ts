import { Enterprise } from "../../entities/Enterprise";
import { EnterpriseSettings } from "../../entities/EnterpriseSettings";

export interface IEnterpriseRepository {
    updateSettings(id: number, settings: EnterpriseSettings): Promise<boolean>
    update(id: number, name: string, address: string, category_id: number, img?: string, img_type?: string): Promise<Enterprise>
    save(category_id: number, enterprise_id: number, name: string, document_type: string, document: string, img: string, img_type: string, address: string): Promise<Enterprise>
}