import { observable, action } from "mobx";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { SaveProductSectionUseCase, SaveProductSectionParams } from "../../../domain/usecases/productSection/SaveProductSectionUseCase";
import { AppError } from "../../../domain/utils/AppError";
import { ReadProductSectionUseCase, ReadProductSectionParams } from "../../../domain/usecases/productSection/ReadProductSectionUseCase";
import { ProductSection } from "../../../domain/entities/ProductSection";

export class ProductFragmentViewModel {
    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    saveProductSectionUseCase = new SaveProductSectionUseCase()
    readProductSectionUseCase = new ReadProductSectionUseCase()


    @observable
    search = ''

    @observable
    newCategoryName = ''

    @observable
    dialogCategoryOpen = false

    @observable
    isFormProductSectionLoading = false

    @observable
    isLoading = false
    
    @observable
    errorProductSectionName = ''

    @observable
    sections: ProductSection[] = []

    @action
    async saveProductSection(): Promise<void> {
        try {
            this.errorProductSectionName = ''

            if (this.newCategoryName === '') {
                this.errorProductSectionName = 'Informe um nome'
                return
            }

            this.isFormProductSectionLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.saveProductSectionUseCase.execute(new SaveProductSectionParams(this.newCategoryName, user!.id))


            this.dialogCategoryOpen = false
        } catch (error) {
            if (error instanceof AppError) {
                //TODO
            }
        }
        this.isFormProductSectionLoading = false
    }

    @action
    async readProductSection(): Promise<void> {
        try {

            this.isLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            this.sections = (await this.readProductSectionUseCase.execute(new ReadProductSectionParams(user!.id))).sections

        } catch (error) {
            if (error instanceof AppError) {
                //TODO
            }
        }
        this.isLoading = false
    }
}