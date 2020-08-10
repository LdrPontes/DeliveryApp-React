import { IAuthEnterpriseRepositoryLocal } from "../../../domain/repositories/local/IAuthEnterpriseRepositoryLocal";
import { EnterpriseUser } from "../../../domain/entities/EnterpriseUser";


export class AuthEnterpriseRepositoryLocal implements IAuthEnterpriseRepositoryLocal {
    
    async saveEnterpriseUser(enterpriseUser: EnterpriseUser): Promise<void> {
        try {
            await localStorage.setItem('enterprise_user', JSON.stringify(enterpriseUser))
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    async getEnterpriseUser(): Promise<EnterpriseUser | null> {
        try {
            const result = await localStorage.getItem('enterprise_user')
            if(result != null)
                return JSON.parse(result)
            else
                return null
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    async saveToken(token: string): Promise<void> {
        try {
            await sessionStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    async getToken(): Promise<string | null> {
        try {
            return await sessionStorage.getItem('token')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}