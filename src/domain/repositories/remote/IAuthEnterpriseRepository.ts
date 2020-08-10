import { EnterpriseUser } from "../../entities/EnterpriseUser";

export interface IAuthEnterpriseRepository{
    signInEnterprise(email: string, password: string): Promise<[EnterpriseUser, string]>
    signUpEnterprise(name: string, telephone: string, email: string, password: string): Promise<[EnterpriseUser, string]>
}