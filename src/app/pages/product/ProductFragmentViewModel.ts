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

    /**
     * ProductForm Observables and variables
     */
    @observable
    dialogProductFormOpen = false

    @observable
    isProductFormLoading = false

    @observable
    productTitle = ''

    @observable
    productDescription = ''

    @observable
    productPrice = ''

    @observable
    productImg = ''

    @observable
    optionals: string[] = ['Adicionais', 'Combos', 'Bebidas']

    @observable
    selectedOptionals: string[] = []

    isProductFormOpenedForEdit = false
    
    openedProductSectionId = 0;


    /**
     * ProductSectionForm Observables and variables
     */

    @observable
    productSectionName = ''

    @observable
    dialogProductSectionFormOpen = false

    @observable
    isProductSectionFormLoading = false

    @observable
    errorProductSectionName = ''

    editProductSectionId = 0;
    
    isProductSectionFormOpenedForEdit = false

    /**
     * ProductFragment Observables
     */
    @observable
    search = ''

    @observable
    isLoading = false

    @observable
    errorApi = ''

    @observable
    sections: ProductSection[] = []

    @action
    async saveProductSection(): Promise<void> {
        this.errorApi = ''

        try {
            this.errorProductSectionName = ''

            if (this.productSectionName === '') {
                this.errorProductSectionName = 'Informe um nome'
                return
            }

            this.isProductSectionFormLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.saveProductSectionUseCase.execute(new SaveProductSectionParams(this.productSectionName, user!.id))
            
            this.productSectionName = ''

            this.dialogProductSectionFormOpen = false
        
        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar categoria. Tente novamente.'
            }
        }
        this.isProductSectionFormLoading = false
    }
  
    @action
    async updateProductSection(): Promise<void> {
        this.errorApi = ''

        try {
            this.errorProductSectionName = ''

            if (this.productSectionName === '') {
                this.errorProductSectionName = 'Informe um nome'
                return
            }

            this.isProductSectionFormLoading = true

            await this.updateProductSectionUseCase.execute(new UpdateProductSectionParams(this.editProductSectionId, this.productSectionName))

            this.productSectionName = ''
            this.editProductSectionId = 0

            this.dialogProductSectionFormOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar categoria. Tente novamente.'
            }
        }
        this.isProductSectionFormLoading = false
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


    @action
    async readOptionalSection(): Promise<void> {
        //TODO
        this.optionals = ['Adicionais', 'Combos', 'Bebidas']
    }

}