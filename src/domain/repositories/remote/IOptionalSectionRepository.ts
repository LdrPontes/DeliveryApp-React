import { OptionalSection } from "../../entities/OptionalSection";

export interface IOptionalSectionRepository {
    delete(id: number): Promise<boolean>
    save(name: string, enterprise_id: number): Promise<OptionalSection>
    update(id: number, name: string): Promise<OptionalSection>
    read(enterprise_id: number, search: string): Promise<OptionalSection[]>
}