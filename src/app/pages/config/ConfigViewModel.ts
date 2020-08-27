import { observable, action } from "mobx";
import { EnterpriseSettings } from "../../../domain/entities/EnterpriseSettings";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { Enterprise } from "../../../domain/entities/Enterprise";

export class ConfigViewModel {

    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()

    @observable
    selectedTab = 0

    @observable
    enterprise?: Enterprise | null = null

    @observable
    enterpriseSettings?: EnterpriseSettings = undefined


    @action
    async initEnterpriseSettings(): Promise<void> {
        try {
            this.enterprise = (await this.getSavedEnterpriseUserUseCase.execute()).user?.enterprise

            const result = (await this.getSavedEnterpriseUserUseCase.execute()).user?.enterprise?.settings.toString()

            this.enterpriseSettings = JSON.parse(result!)

        } catch (error) {
        }
    }
}