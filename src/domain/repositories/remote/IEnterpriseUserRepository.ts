import { EnterpriseUser } from "../../entities/EnterpriseUser";

export interface IEnterpriseUserRepository {
    update(id: number, name: string, telephone: string, email: string, password?: string): Promise<EnterpriseUser>
}