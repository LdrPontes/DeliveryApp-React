import { IAuthEnterpriseRepository } from "../../../domain/repositories/remote/IAuthEnterpriseRepository";
import { EnterpriseUser } from "../../../domain/entities/EnterpriseUser";
import api from '../utils/RemoteConnection'
import { AppError } from "../../../domain/utils/AppError";

export class AuthEnterpriseRepository implements IAuthEnterpriseRepository {

    async signInEnterprise(email: string, password: string): Promise<[EnterpriseUser, string]> {
        try {

            const response = await api.post('/enterprise/auth', { email: email, password: password })

            return [
                new EnterpriseUser(response.data.enterprise_user.id, response.data.enterprise_user.name, response.data.enterprise_user.telephone,
                    response.data.enterprise_user.email, '', response.data.enterprise_user.enterprise),

                response.data.token
            ]

        } catch (error) {
            throw new AppError(error.response.data.status,error.response.data.name, error.response.data.message)
        }
    }


    async signUpEnterprise(name: string, telephone: string, email: string, password: string): Promise<[EnterpriseUser, string]> {
        try {

            const response = await api.post('/enterprise/register', { name: name, telephone: telephone, email: email, password: password })

            return [
                new EnterpriseUser(response.data.enterprise_user.id, response.data.enterprise_user.name, response.data.enterprise_user.telephone,
                    response.data.enterprise_user.email, '', null),

                response.data.token
            ]

        } catch (error) {
            throw new AppError(error.response.data.status,error.response.data.name, error.response.data.message)
        }
    }

}