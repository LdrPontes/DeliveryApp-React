import { ProductSection } from "../../entities/ProductSection";

export interface IProductSectionRepository {
    delete(id: number): Promise<boolean>
    save(name: string, enterprise_id: number): Promise<ProductSection>
    update(id: number, name: string): Promise<ProductSection>
    read(enterprise_id: number, search: string): Promise<ProductSection[]>
}