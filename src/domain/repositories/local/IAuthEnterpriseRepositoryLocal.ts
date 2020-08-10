import { EnterpriseUser } from "../../entities/EnterpriseUser";

export interface IAuthEnterpriseRepositoryLocal{

    saveEnterpriseUser(enterpriseUser: EnterpriseUser): Promise<void>

    getEnterpriseUser(): Promise<EnterpriseUser | null>

    saveToken(token: string): Promise<void>

    getToken(): Promise<string | null>
}