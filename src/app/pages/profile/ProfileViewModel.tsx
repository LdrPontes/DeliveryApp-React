import { observable, action } from "mobx";
import { GetAddressUseCase, GetAddressParams } from "../../../domain/usecases/address/GetAddressUseCase";
import { Category } from "../../../domain/entities/Category";
import { ReadAllCategoryUseCase } from "../../../domain/usecases/category/ReadAllCategoryUseCase";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { AppError } from "../../../domain/utils/AppError";
import { UpdateEnterpriseUserUseCase, UpdateEnterpriseUserParams } from "../../../domain/usecases/enterpriseUser/UpdateEnterpriseUserUseCase";
import { UpdateEnterpriseParams, UpdateEnterpriseUseCase } from "../../../domain/usecases/enterprise/UpdateEnterpriseUseCase";

export class ProfileViewModel {
    getAddressUseCase = new GetAddressUseCase()
    readAllCategoryUseCase = new ReadAllCategoryUseCase()
    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    updateEnterpriseUserUseCase = new UpdateEnterpriseUserUseCase()
    updateEnterpriseUseCase = new UpdateEnterpriseUseCase()

    //Section Account
    @observable
    name = ''

    @observable
    errorName = ''

    @observable
    email = ''

    @observable
    errorEmail = ''

    @observable
    telephone = ''

    @observable
    errorTelephone = ''

    @observable
    password = ''

    @observable
    errorPassword = ''

    @observable
    confirmPassword = ''

    @observable
    errorConfirmPassword = ''

    @observable
    updatingAccount = false

    @observable
    successAccountUpdate = false

    //Section Enterprise
    @observable
    enterpriseName = ''

    @observable
    errorCep = ''

    @observable
    number = ''

    @observable
    cep = ''

    @observable
    category = 0

    @observable
    address = ''

    @observable
    preview = ''

    @observable
    categories: Category[] = []

    @observable
    errorCategory = ''

    imgBase64: string | undefined = ''

    imgType: string | undefined = ''

    @observable
    errorEnterpriseName = ''

    @observable
    updatingEnterprise = false

    @observable
    successEnterpriseUpdate = false


    //General
    @observable
    selectedTab = 0

    @observable
    showPassword = false

    @observable
    errorApi = ''

    @action
    async initProfileValues(): Promise<void> {
        try {
            const enterpriseUser = (await this.getSavedEnterpriseUserUseCase.execute()).user

            this.name = enterpriseUser!.name
            this.email = enterpriseUser!.email
            this.telephone = enterpriseUser!.telephone

            this.enterpriseName = enterpriseUser!.enterprise!.name
            this.preview = enterpriseUser!.enterprise!.logo_url
            this.category = enterpriseUser!.enterprise!.category_id
            this.cep = enterpriseUser!.enterprise!.address.split(',')[3].trim()
            this.address = enterpriseUser!.enterprise!.address.split(',')[0].trim() + ', ' + enterpriseUser!.enterprise!.address.split(',')[1].trim()
            this.number = enterpriseUser!.enterprise!.address.split(',')[2].trim()

        } catch (error) {

        }
    }

    @action
    handleAddressByCep(e: any): void {
        this.cep = e.target.value

        if (this.cep.trim().length === 9) {
            this.getAddressByCep()
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
    async getAddressByCep(): Promise<void> {
        try {
            const result = (await this.getAddressUseCase.execute(new GetAddressParams(this.cep.replace('-', '')))).address

            this.address = `${result.street}, ${result.district}`
        } catch (error) {
            this.errorCep = 'Informe um CEP válido'
        }

    }

    @action
    async readAllCategories(): Promise<void> {
        this.categories = (await this.readAllCategoryUseCase.execute()).categories
    }

    private hasAccountFieldErrors(): boolean {

        if (this.name === '') {
            this.errorName = 'Informe um nome'
            return true
        }

        if (this.telephone === '') {
            this.errorTelephone = 'Informe um telephone'
            return true
        }

        if (this.email === '') {
            this.errorEmail = 'Informe um e-mail'
            return true
        }

        if (this.password !== '' && this.password.length < 6) {
            this.errorPassword = 'Informe uma senha válida'
            return true
        }

        if (this.password !== '' && this.confirmPassword !== this.password) {
            this.errorConfirmPassword = 'As senhas são diferentes'
            return true
        }

        return false
    }

    private setDefaultErrorAccountValues(): void {
        this.errorName = ''
        this.errorEmail = ''
        this.errorTelephone = ''
        this.errorPassword = ''
        this.errorConfirmPassword = ''
        this.successAccountUpdate = false
    }

    @action
    async updateAccount(): Promise<void> {
        this.updatingAccount = true
        this.setDefaultErrorAccountValues()
        try {
            if (this.hasAccountFieldErrors()) {
                this.updatingAccount = false
                return
            }

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.updateEnterpriseUserUseCase.execute(new UpdateEnterpriseUserParams(user!.id, this.name, this.telephone, this.email, this.password === '' ? undefined : this.password))
            this.successAccountUpdate = true
        } catch (error) {
            console.log(error)
            if (error instanceof AppError) {
                switch (error.name) {
                    case 'ER_DUP_ENTRY':
                        this.errorEmail = 'Esse e-mail já está cadastrado.'
                        break
                    default:
                        this.errorApi = 'Falha ao atualizar. Verifique seus dados e tente novamente.'
                        break
                }
            } else {
                this.errorApi = 'Falha ao atualizar. Verifique seus dados e tente novamente.'
            }
        }

        this.updatingAccount = false

    }



    @action
    private hasFieldEnterpriseErrors(): boolean {

        if (this.enterpriseName === '') {
            this.errorEnterpriseName = 'Informe um nome'
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
    private setDefaultEnterpriseErrorValues() {

        this.errorEnterpriseName = ''
        this.errorCategory = ''
        this.errorCep = ''
    }

    @action
    async updateEnterprise(): Promise<void> {
        this.updatingEnterprise = true
        this.setDefaultEnterpriseErrorValues()
        try {
            if (this.hasFieldEnterpriseErrors()) {
                this.updatingEnterprise = false
                return
            }

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            const completeAddress = this.address + ',' + this.number + ',' + this.cep

            await this.updateEnterpriseUseCase.execute(new UpdateEnterpriseParams(user!.enterprise!.id, this.enterpriseName, completeAddress, this.category, this.imgBase64, this.imgType))

            this.successEnterpriseUpdate = true
        } catch (error) {
            this.errorApi = 'Falha ao atualizar. Verifique seus dados e tente novamente.'
        }

        this.updatingEnterprise = false

    }
}