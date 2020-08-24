import { observable, action } from "mobx";
import { GetAddressUseCase, GetAddressParams } from "../../../domain/usecases/address/GetAddressUseCase";
import { Category } from "../../../domain/entities/Category";
import { ReadAllCategoryUseCase } from "../../../domain/usecases/category/ReadAllCategoryUseCase";

export class ProfileViewModel {
    getAddressUseCase = new GetAddressUseCase()
    readAllCategoryUseCase = new ReadAllCategoryUseCase()
    
    @observable
    selectedTab = 0

    @observable
    showPassword = false

    @observable
    telephone = ''

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
}