import { observable, action } from "mobx";
import { ReadAllCategoryUseCase } from "../../../../domain/usecases/category/ReadAllCategoryUseCase";
import { Category } from "../../../../domain/entities/Category";
import { GetAddressUseCase, GetAddressParams } from "../../../../domain/usecases/address/GetAddressUseCase";

export class EnterpriseRegisterFormViewModel {

    readAllCategoryUseCase = new ReadAllCategoryUseCase()
    getAddressUseCase = new GetAddressUseCase()

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

    @observable
    preview = ''

    @observable
    number = '0'

    @observable
    categories: Category[] = []

    async readAllCategories(): Promise<void> {
        this.categories = (await this.readAllCategoryUseCase.execute()).categories
    }

    async getAddressByCep(): Promise<void> {
        const result = (await this.getAddressUseCase.execute(new GetAddressParams(this.cep.replace('-', '')))).address

        this.address = `${result.street}, ${result.district}`
    }

    @action
    async saveEnterprise(): Promise<void> {
        //TODO
    }
}