import { observable, action } from "mobx"
import { Enterprise } from "../../../domain/entities/Enterprise"
import { ReadEnterpriseByCodeUseCase, ReadEnterpriseByCodeParams } from "../../../domain/usecases/order/ReadEnterpriseByCodeUseCase"
import { AppError } from "../../../domain/utils/AppError"
import { Product } from "../../../domain/entities/Product"
import { EnterpriseSettings } from "../../../domain/entities/EnterpriseSettings"

export class OrderViewModel {

    readEnterpriseByCodeUseCase = new ReadEnterpriseByCodeUseCase()

    @observable
    selectedProduct?: Product

    @observable
    openDialogProduct = false

    @observable
    openDialogCart = false

    @observable
    enterprise?: Enterprise

    @observable
    settings?: EnterpriseSettings

    @observable
    errorApi = ''

    @action
    async readEnterpriseByCode(code: string): Promise<void> {
        this.errorApi = ''
        
        try {
            const result = (await this.readEnterpriseByCodeUseCase.execute(new ReadEnterpriseByCodeParams(code))).enterprise

            const settings = result.settings.toString()

            result.settings = JSON.parse(settings)
            
            this.settings = JSON.parse(settings)

            this.enterprise = result

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao buscar os dados. Tente novamente.'
            }
        }
    }
}