import { observable, action } from "mobx";

export class EnterpriseRegisterFormViewModel {

    @observable
    typeDocument = '0'

    @observable
    document = ''

    @observable
    cep = ''

    @observable
    address = ''

    @observable
    isLoading = false

    @action
    getCategories(): string[] {
        //TODO Buscar da API
        return ['', 'Segmento - 0', 'Segmento - 1', 'Segmento - 3']
    }

    @action
    async saveEnterprise(): Promise<void> {
        //TODO
    }
}