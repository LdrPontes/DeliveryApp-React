import { observable, computed, action } from "mobx";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { Enterprise } from "../../../domain/entities/Enterprise";
import { EnterpriseCatalog } from "../../../domain/entities/EnterpriseCatalog";
import { UpdateEnterpriseCatalogUseCase, UpdateEnterpriseCatalogParams } from "../../../domain/usecases/enterprise/UpdateEnterpriseCatalogUseCase";

export class CatalogViewModel {

    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    updateEnterpriseCatalogUseCase = new UpdateEnterpriseCatalogUseCase()
    
    @observable
    enterprise?: Enterprise | null = null

    @observable
    enterpriseCatalog?: EnterpriseCatalog = undefined

    @observable
    colorPickerVisible = false

    @observable
    loading = false

    @observable
    msgStart = ''

    @observable
    msgEnd = ''

    @observable
    selectedColor = '#880e4f'

    @observable
    code = ''

    @observable
    errorCode = ''

    @observable
    errorMsgStart = ''

    @observable 
    errorMsgEnd = ''

    @observable
    errorApi = ''

    @observable
    successUpdate = false

    @computed get lengthMsgStart(): number {
        return 144 - this.msgStart.length
    }

    @computed get lengthMsgEnd(): number {
        return 144 - this.msgEnd.length
    }

    @action
    async initEnterpriseSettings(): Promise<void> {
        try {
            this.enterprise = (await this.getSavedEnterpriseUserUseCase.execute()).user?.enterprise

            const result = this.enterprise?.catalog?.toString()

            this.enterpriseCatalog = JSON.parse(result!)
            
            this.selectedColor = this.enterpriseCatalog!.color
            this.msgStart = this.enterpriseCatalog!.start_msg
            this.msgEnd = this.enterpriseCatalog!.end_msg
            this.code = this.enterprise!.code

        } catch (error) {
            console.log('Error' + error)
        }
    }

    @action
    async updateCatalog(): Promise<void> {
        try {
            this.errorCode = ''
            this.errorMsgStart = ''
            this.errorMsgEnd = ''
            
            if(this.code === '') {
                this.errorCode = 'Informe um nome'
                return
            }

            if(this.msgStart === '') {
                this.errorMsgStart = 'Informe uma mensagem'
                return
            }

            if(this.msgEnd === '') {
                this.errorMsgEnd = 'Informe uma mensagem'
                return
            }

            this.loading = true

            this.enterpriseCatalog!.color = this.selectedColor
            this.enterpriseCatalog!.start_msg = this.msgStart
            this.enterpriseCatalog!.end_msg = this.msgEnd

            await this.updateEnterpriseCatalogUseCase.execute(new UpdateEnterpriseCatalogParams(this.enterprise!.id, this.enterpriseCatalog!, this.code))

            this.loading = false

            this.successUpdate = true
        } catch (error) {
            this.errorApi = 'Erro ao atualizar o catálogo. Tente novamente'
        }
    }
}