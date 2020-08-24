import { IEnterpriseUserRepository } from "../../../domain/repositories/remote/IEnterpriseUserRepository";
import { EnterpriseUser } from "../../../domain/entities/EnterpriseUser";
import api from "../utils/RemoteConnection";
import { AppError } from "../../../domain/utils/AppError";

export class EnterpriseUserRepository implements IEnterpriseUserRepository {
    async update(id: number, name: string, telephone: string, email: string, password?: string | undefined): Promise<EnterpriseUser> {
        try {

            const response = await api.put('/enterprise/user/update', {id: id, name: name, telephone: telephone, email: email, password: password })

            return new EnterpriseUser(response.data.id, response.data.name, response.data.telephone,
                response.data.email, '', response.data.enterprise)

        } catch (error) {
            throw new AppError(error.response.data.status,error.response.data.name, error.response.data.message)
        }
    }
    
}