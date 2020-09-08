import { observable, action } from "mobx";
import { EnterpriseUser } from "../../../domain/entities/EnterpriseUser";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { logout } from "../../utils/AuthUtil";

export class MainPageViewModel {
    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()

    @observable
    position = 0;

    @observable
    user: EnterpriseUser | null = null

    @observable
    logout = false

    @action
    async getEnterpriseUser(): Promise<void> {
        const result = (await this.getSavedEnterpriseUserUseCase.execute()).user
        this.user = result
    }

    @action
    handleLogout(): void {
        logout()
        this.logout = true
    }
}