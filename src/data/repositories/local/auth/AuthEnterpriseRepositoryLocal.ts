import { IAuthEnterpriseRepositoryLocal } from "../../../../domain/repositories/local/auth/IAuthEnterpriseRepositoryLocal";
import { EnterpriseUser } from "../../../../domain/entities/EnterpriseUser";


export class AuthEnterpriseRepositoryLocal implements IAuthEnterpriseRepositoryLocal {
    
    async saveEnterpriseUser(enterpriseUser: EnterpriseUser): Promise<void> {
        try {
            localStorage.setItem('enterprise_user', JSON.stringify(enterpriseUser))
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    async getEnterpriseUser(): Promise<EnterpriseUser | null> {
        try {
            const result = localStorage.getItem('enterprise_user')
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
            console.log('Salvou Token ' + token)
            sessionStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    
    async getToken(): Promise<string | null> {
        try {
            return sessionStorage.getItem('token')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}