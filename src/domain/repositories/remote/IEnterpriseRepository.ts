import { Enterprise } from "../../entities/Enterprise";
import { EnterpriseSettings } from "../../entities/EnterpriseSettings";
import { EnterpriseCatalog } from "../../entities/EnterpriseCatalog";

export interface IEnterpriseRepository {
    updateCatalog(id: number, catalog: EnterpriseCatalog, code: string): Promise<boolean>
    readByCode(code: string): Promise<Enterprise>
    updateSettings(id: number, settings: EnterpriseSettings): Promise<boolean>
    update(id: number, name: string, address: string, category_id: number, img?: string, img_type?: string): Promise<Enterprise>
    save(category_id: number, enterprise_id: number, name: string, document_type: string, document: string, img: string, img_type: string, address: string): Promise<Enterprise>
}