import { ProductSection } from "../../../entities/ProductSection";

export interface IProductSectionRepository {
    save(name: string, enterprise_id: number): Promise<ProductSection>
    read(enterprise_id: number): Promise<ProductSection[]>
}