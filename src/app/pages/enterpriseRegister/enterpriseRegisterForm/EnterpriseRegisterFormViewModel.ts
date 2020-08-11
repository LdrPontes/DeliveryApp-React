import { observable, action } from "mobx";
import { ReadAllCategoryUseCase } from "../../../../domain/usecases/category/ReadAllCategoryUseCase";
import { Category } from "../../../../domain/entities/Category";
import { GetAddressUseCase, GetAddressParams } from "../../../../domain/usecases/address/GetAddressUseCase";
import { GetSavedEnterpriseUserUseCase } from "../../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { SaveEnterpriseUseCase, SaveEnterpriseParams } from "../../../../domain/usecases/enterprise/SaveEnterpriseUseCase";
import { AppError } from "../../../../domain/utils/AppError";

export class EnterpriseRegisterFormViewModel {

    readAllCategoryUseCase = new ReadAllCategoryUseCase()
    getAddressUseCase = new GetAddressUseCase()
    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    saveEnterpriseUseCase = new SaveEnterpriseUseCase()

    @observable
    name = ''

    @observable
    typeDocument = '0'

    @observable
    document = ''

    @observable
    cep = ''

    @observable
    category = 0

    @observable
    address = ''

    @observable
    isLoading = false

    @observable
    preview = ''

    @observable
    number = ''

    @observable
    errorName = ''

    @observable
    errorDocument = ''

    @observable
    errorCep = ''

    @observable
    errorCategory = ''


    @observable
    isSuccess = false

    imgBase64: string | undefined = ''
    imgType: string | undefined = ''

    @observable
    categories: Category[] = []

    @action
    async readAllCategories(): Promise<void> {
        this.categories = (await this.readAllCategoryUseCase.execute()).categories
    }

    @action
    async getAddressByCep(): Promise<void> {
        try {
            const result = (await this.getAddressUseCase.execute(new GetAddressParams(this.cep.replace('-', '')))).address

            this.address = `${result.street}, ${result.district}`
        } catch (error) {
            this.errorCep = 'Informe um CEP válido'
        }

    }

    setBase64Image(file: File): void {

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imgType = file.type
            this.imgBase64 = reader.result?.toString().replace(`data:${this.imgType};base64,`, '')
            console.log(this.imgBase64)

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    @action
    handleAddressByCep(e: any): void {
        this.cep = e.target.value

        if (this.cep.trim().length === 9) {
            this.getAddressByCep()
        }
    }

    @action
    private setDefaultValues() {

        this.errorName = ''
        this.errorCategory = ''
        this.errorCep = ''
        this.errorDocument = ''

        this.isSuccess = false
    }

    @action
    private hasFieldErrors(): boolean {

        if (this.name === '') {
            this.errorName = 'Informe um nome'
            return true
        }

        if (this.document.trim() === '') {
            this.errorDocument = `Informe um ${this.typeDocument === '0' ? 'CPF' : 'CNPJ'} válido`
            return true
        }

        if (this.address === '') {
            this.errorCep = 'Informe um CEP válido'
            return true
        }

        if (this.category === 0) {
            this.errorCategory = 'Selecione um seguimento'
            return true
        }


        return false
    }

    @action
    async saveEnterprise(): Promise<void> {
        this.setDefaultValues()
        
        try {

            if (this.hasFieldErrors()) {
                return
            }

            this.isLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.saveEnterpriseUseCase.execute(new SaveEnterpriseParams(this.category, user!.id, this.name, this.typeDocument, this.document, this.imgBase64!, this.imgType!, this.address))

            this.isSuccess = true

        } catch (error) {
            if (error instanceof AppError) {
                console.log(error.name)
                this.handlerResponseErrors(error)
            } else {
                console.log('Error')
            }

            this.isSuccess = false
        }

        this.isLoading = false

    }

    @action
    private handlerResponseErrors(error: AppError) {
        switch (error.name) {
            case 'ER_DUP_ENTRY':
                this.errorDocument = `Esse ${this.typeDocument === '0' ? 'CPF' : 'CNPJ'} já está cadastrado.`
                break
            case 'INVALID_DOCUMENT':
                this.errorDocument = `Informe um ${this.typeDocument === '0' ? 'CPF' : 'CNPJ'} válido`
                break
            default:
                break
        }
    }
}