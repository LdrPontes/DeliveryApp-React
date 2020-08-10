import { observable, action } from "mobx";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { SaveProductSectionUseCase, SaveProductSectionParams } from "../../../domain/usecases/productSection/SaveProductSectionUseCase";
import { AppError } from "../../../domain/utils/AppError";
import { ReadProductSectionUseCase, ReadProductSectionParams } from "../../../domain/usecases/productSection/ReadProductSectionUseCase";
import { ProductSection } from "../../../domain/entities/ProductSection";
import { DeleteProductSectionUseCase, DeleteProductSectionParams } from "../../../domain/usecases/productSection/DeleteProductSectionUseCase";
import { UpdateProductSectionUseCase, UpdateProductSectionParams } from "../../../domain/usecases/productSection/UpdateProductSectionUseCase";

export class ProductFragmentViewModel {
    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    saveProductSectionUseCase = new SaveProductSectionUseCase()
    updateProductSectionUseCase = new UpdateProductSectionUseCase()
    readProductSectionUseCase = new ReadProductSectionUseCase()
    deleteProductSectionUseCase = new DeleteProductSectionUseCase()


    @observable
    search = ''
    @observable
    newCategoryName = ''

    @observable
    dialogCategoryOpen = false

    isCategoryOpenForEdit = false

    @observable
    isFormProductSectionLoading = false

    @observable
    isLoading = false
    
    @observable
    errorProductSectionName = ''

    @observable
    sections: ProductSection[] = []

    @observable
    errorApi = ''

    editCategoryId = 0;

    @action
    async saveProductSection(): Promise<void> {
        this.errorApi = ''

        try {
            this.errorProductSectionName = ''

            if (this.newCategoryName === '') {
                this.errorProductSectionName = 'Informe um nome'
                return
            }

            this.isFormProductSectionLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.saveProductSectionUseCase.execute(new SaveProductSectionParams(this.newCategoryName, user!.id))
            
            this.newCategoryName = ''

            this.dialogCategoryOpen = false
        
        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar categoria. Tente novamente.'
            }
        }
        this.isFormProductSectionLoading = false
    }
    @action
    async updateProductSection(): Promise<void> {
        this.errorApi = ''

        try {
            this.errorProductSectionName = ''

            if (this.newCategoryName === '') {
                this.errorProductSectionName = 'Informe um nome'
                return
            }

            this.isFormProductSectionLoading = true

            await this.updateProductSectionUseCase.execute(new UpdateProductSectionParams(this.editCategoryId, this.newCategoryName))

            this.newCategoryName = ''
            this.editCategoryId = 0

            this.dialogCategoryOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar categoria. Tente novamente.'
            }
        }
        this.isFormProductSectionLoading = false
    }

    @action
    async readProductSection(): Promise<void> {
        this.errorApi = ''

        try {

            this.isLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            this.sections = (await this.readProductSectionUseCase.execute(new ReadProductSectionParams(user!.id, this.search))).sections

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao buscar dados. Tente novamente.'
            }
        }
        this.isLoading = false
    }

    @action
    async deleteProductSection(id: number): Promise<void> {
        this.errorApi = ''

        try {

            this.isLoading = true

            await this.deleteProductSectionUseCase.execute(new DeleteProductSectionParams(id))
            
            this.readProductSection()

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao deletar a categoria. Tente novamente.'
            }
        }
        this.isLoading = false
    }

}