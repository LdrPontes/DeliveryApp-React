import { observable, action } from "mobx";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { SaveProductSectionUseCase, SaveProductSectionParams } from "../../../domain/usecases/productSection/SaveProductSectionUseCase";
import { AppError } from "../../../domain/utils/AppError";
import { ReadProductSectionUseCase, ReadProductSectionParams } from "../../../domain/usecases/productSection/ReadProductSectionUseCase";
import { ProductSection } from "../../../domain/entities/ProductSection";
import { DeleteProductSectionUseCase, DeleteProductSectionParams } from "../../../domain/usecases/productSection/DeleteProductSectionUseCase";
import { UpdateProductSectionUseCase, UpdateProductSectionParams } from "../../../domain/usecases/productSection/UpdateProductSectionUseCase";
import { OptionalSection } from "../../../domain/entities/OptionalSection";
import { ReadOptionalSectionUseCase, ReadOptionalSectionParams } from "../../../domain/usecases/optionalSection/ReadOptionalSectionUseCase";
import { SaveProductUseCase, SaveProductParams } from "../../../domain/usecases/product/SaveProductUseCase";
import { DeleteProductUseCase, DeleteProductParams } from "../../../domain/usecases/product/DeleteProductUseCase";
import { UpdateProductParams, UpdateProductUseCase } from "../../../domain/usecases/product/UpdateProductUseCase";

export class ProductFragmentViewModel {
    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    saveProductSectionUseCase = new SaveProductSectionUseCase()
    updateProductSectionUseCase = new UpdateProductSectionUseCase()
    readProductSectionUseCase = new ReadProductSectionUseCase()
    deleteProductSectionUseCase = new DeleteProductSectionUseCase()


    readOptionalSectionUseCase = new ReadOptionalSectionUseCase()

    saveProductUseCase = new SaveProductUseCase()
    deleteProductUseCase = new DeleteProductUseCase()
    updateProductUseCase = new UpdateProductUseCase()
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
    productPreviewImg = ''

    @observable
    optionals: OptionalSection[] = []

    @observable
    selectedOptionals: number[] = []

    @observable
    selectedProductSectionId = 0

    @observable
    errorProductTitle = ''

    @observable
    errorProductDescription = ''

    @observable
    errorProductSection = ''

    @observable
    errorProductPrice = ''

    isProductFormOpenedForEdit = false

    productImgType = ''

    productEditId = 0


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
                this.errorApi = 'Erro ao salvar a categoria. Tente novamente.'
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
                this.errorApi = 'Erro ao atualizar a categoria. Tente novamente.'
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
                this.errorApi = 'Erro ao delete a categoria. Tente novamente.'
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
        this.errorApi = ''

        try {

            this.isLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            this.optionals = (await this.readOptionalSectionUseCase.execute(new ReadOptionalSectionParams(user!.id, ''))).sections

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao buscar dados. Tente novamente.'
            }
        }
        this.isLoading = false
    }

    @action
    private setDefaultValuesProductForm() {
        this.errorProductTitle = ''
        this.errorProductDescription = ''
        this.errorProductPrice = ''
        this.errorProductSection = ''

        this.isProductFormLoading = false
    }

    @action
    private hasProductFormFieldErrors(): boolean {



        if (this.productTitle.trim() === '') {
            this.errorProductTitle = 'Informe um nome'
            return true
        }

        if (this.productDescription.trim() === '') {
            this.errorProductDescription = `Informe uma descrição`
            return true
        }

        if (this.productPrice === '') {
            this.errorProductPrice = 'Informe um preço'
            return true
        }

        if (this.selectedProductSectionId === 0) {
            this.errorProductSection = 'Selecione uma categoria'
            return true
        }


        return false
    }

    @action
    async saveProduct(): Promise<void> {
        this.errorApi = ''

        this.setDefaultValuesProductForm()
        try {


            if (this.hasProductFormFieldErrors()) {
                return
            }

            this.isProductFormLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.saveProductUseCase.execute(new SaveProductParams(this.productTitle, this.productDescription, this.productImg, this.productImgType,
                Number(this.productPrice), user!.id, this.selectedProductSectionId, this.selectedOptionals))

            this.productTitle = ''
            this.productDescription = ''
            this.productImg = ''
            this.productPreviewImg = ''
            this.productPrice = ''
            this.selectedOptionals = []

            this.dialogProductFormOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar produto. Tente novamente.'
            }
        }
        this.isProductFormLoading = false
    }


    @action
    async deleteProduct(id: number): Promise<void> {
        this.errorApi = ''

        try {

            this.isLoading = true

            await this.deleteProductUseCase.execute(new DeleteProductParams(id))

            this.readProductSection()

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao deletar a categoria. Tente novamente.'
            }
        }
        this.isLoading = false
    }

    @action
    async updateProduct(): Promise<void> {
        this.setDefaultValuesProductForm()
        try {


            if (this.hasProductFormFieldErrors()) {
                return
            }

            this.isProductFormLoading = true

            await this.updateProductUseCase.execute(new UpdateProductParams(
                this.productEditId,
                this.productTitle,
                this.productDescription,
                this.productImg,
                this.productImgType,
                Number(this.productPrice),
                this.selectedProductSectionId,
                this.selectedOptionals
            ))

            this.productEditId = 0
            this.productTitle = ''
            this.productDescription = ''
            this.productImg = ''
            this.productPreviewImg = ''
            this.productPrice = ''
            this.selectedOptionals = []


            this.dialogProductFormOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar categoria. Tente novamente.'
            }
        }
        this.isProductFormLoading = false
    }

    setBase64Image(file: File): void {

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            this.productImgType = file.type
            const result = reader.result?.toString().replace(`data:${this.productImgType};base64,`, '')

            if (result !== undefined)
                this.productImg = result
            else
                this.productImg = ''

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
}