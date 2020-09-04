import { observable, action } from "mobx";
import { OptionalSection } from "../../../domain/entities/OptionalSection";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { ReadOptionalSectionUseCase, ReadOptionalSectionParams } from "../../../domain/usecases/optionalSection/ReadOptionalSectionUseCase";
import { AppError } from "../../../domain/utils/AppError";
import { SaveOptionalSectionUseCase, SaveOptionalSectionParams } from "../../../domain/usecases/optionalSection/SaveOptionalSectionUseCase";
import { UpdateOptionalSectionUseCase, UpdateOptionalSectionParams } from "../../../domain/usecases/optionalSection/UpdateOptionalSectionUseCase";
import { DeleteOptionalSectionUseCase, DeleteOptionalSectionParams } from "../../../domain/usecases/optionalSection/DeleteOptionalSectionUseCase";
import { SaveOptionalUseCase, SaveOptionalParams } from "../../../domain/usecases/optional/SaveOptionalUseCase";
import { UpdateOptionalUseCase, UpdateOptionalParams } from "../../../domain/usecases/optional/UpdateOptionalUseCase";
import { DeleteOptionalUseCase, DeleteOptionalParams } from "../../../domain/usecases/optional/DeleteOptionalUseCase";

export class OptionalFragmentViewModel {

    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    readOptionalSectionUseCase = new ReadOptionalSectionUseCase()
    saveOptionalSectionUseCase = new SaveOptionalSectionUseCase()
    updateOptionalSectionUseCase = new UpdateOptionalSectionUseCase()
    deleteOptionalSectionUseCase = new DeleteOptionalSectionUseCase()

    saveOptionalUseCase = new SaveOptionalUseCase()
    updateOptionalUseCase = new UpdateOptionalUseCase()
    deleteOptionalUseCase = new DeleteOptionalUseCase()


    /**
     * OptionalForm variables
     */
    @observable
    optionalName = ''

    @observable
    optionalErrorName = ''

    @observable
    optionalPrice = ''

    @observable
    optionalErrorPrice = ''

    optionalSectionId = 0

    @observable
    optionalFormOpen = false

    @observable
    optionalFormEdit = false

    @observable
    optionalFormLoading = false

    @observable
    optionalEditId = 0


    /**
     * OptionalSectionForm variables
     */

    @observable
    sectionName = ''

    @observable
    sectionMin = ''

    @observable
    sectionMax = ''

    @observable
    sectionErrorName = ''

    @observable
    sectionErrorMin = ''

    @observable
    optionalSectionFormOpen = false

    @observable
    optionalSectionFormEdit = false

    @observable
    optionalSectionFormLoading = false

    sectionEditId = 0


    /**
     * OptionalFragment variables
     */
    @observable
    search = ''

    @observable
    sections: OptionalSection[] = []

    @observable
    isLoading = false

    @observable
    errorApi = ''


    @action
    async readOptionalSection(): Promise<void> {
        this.errorApi = ''

        try {

            this.isLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            this.sections = (await this.readOptionalSectionUseCase.execute(new ReadOptionalSectionParams(user!.enterprise!.id, this.search))).sections

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao buscar dados. Tente novamente.'
            }
        }
        this.isLoading = false
    }

    @action
    async saveOptionalSection(): Promise<void> {
        this.errorApi = ''

        try {
            this.sectionErrorName = ''
            this.sectionErrorMin = ''

            if (this.sectionName === '') {
                this.sectionErrorName = 'Informe um nome'
                return
            }

            if (Number(this.sectionMin) > Number(this.sectionMax)) {
                this.sectionErrorMin = 'Mínimo não pode ser maior que o máximo'
                return
            }


            this.optionalSectionFormLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            await this.saveOptionalSectionUseCase.execute(new SaveOptionalSectionParams(this.sectionName, user!.enterprise!.id, Number(this.sectionMin), Number(this.sectionMax)))

            this.sectionName = ''
            this.sectionMin = ''
            this.sectionMax = ''

            this.optionalSectionFormOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar seção. Tente novamente.'
            }
        }
        this.optionalSectionFormLoading = false
    }

    @action
    async updateOptionalSection(): Promise<void> {
        this.errorApi = ''

        try {
            this.sectionErrorName = ''
            this.sectionErrorMin = ''

            if (this.sectionName === '') {
                this.sectionErrorName = 'Informe um nome'
                return
            }

            if (Number(this.sectionMin) > Number(this.sectionMax)) {
                this.sectionErrorMin = 'Mínimo não pode ser maior que o máximo'
                return
            }


            this.optionalSectionFormLoading = true


            await this.updateOptionalSectionUseCase.execute(new UpdateOptionalSectionParams(this.sectionEditId, this.sectionName, Number(this.sectionMin), Number(this.sectionMax)))

            this.sectionName = ''
            this.sectionMin = ''
            this.sectionMax = ''

            this.optionalSectionFormEdit = false
            this.optionalSectionFormOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao atualizar seção. Tente novamente.'
            }
        }
        this.optionalSectionFormLoading = false
    }

    @action
    async deleteOptionalSection(id: number): Promise<void> {
        this.errorApi = ''

        try {

            this.isLoading = true

            await this.deleteOptionalSectionUseCase.execute(new DeleteOptionalSectionParams(id))

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao deletar a seção. Tente novamente.'
            }
        }
        this.isLoading = false
    }

    @action
    async saveOptional(): Promise<void> {
        this.errorApi = ''

        try {
            this.optionalErrorName = ''
            this.optionalErrorPrice = ''

            if (this.optionalName === '') {
                this.optionalErrorName = 'Informe um nome'
                return
            }

            if (this.optionalPrice === '') {
                this.optionalErrorPrice = 'Informe um preço'
                return
            }

            this.optionalFormLoading = true

            const user = (await this.getSavedEnterpriseUserUseCase.execute()).user

            console.log(user!.id)

            await this.saveOptionalUseCase.execute(new SaveOptionalParams(this.optionalName, user!.enterprise!.id, this.optionalSectionId, Number(this.optionalPrice)))

            this.optionalName = ''
            this.optionalPrice = ''

            this.optionalFormOpen = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao salvar opcional. Tente novamente.'
            }
        }
        this.optionalFormLoading = false
    }

    @action
    async updateOptional(): Promise<void> {
        this.errorApi = ''

        try {
            this.optionalErrorName = ''
            this.optionalErrorPrice = ''

            if (this.optionalName === '') {
                this.optionalErrorName = 'Informe um nome'
                return
            }

            if (this.optionalPrice === '') {
                this.optionalErrorPrice = 'Informe um preço'
                return
            }


            this.optionalFormLoading = true


            await this.updateOptionalUseCase.execute(new UpdateOptionalParams(this.optionalEditId, this.optionalName, Number(this.optionalPrice)))

            this.optionalName = ''
            this.optionalPrice = ''

            this.optionalFormOpen = false
            this.optionalFormEdit = false

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao atualizar o opcional. Tente novamente.'
            }
        }
        this.optionalFormLoading = false
    }

    @action
    async deleteOptional(id: number): Promise<void> {
        this.errorApi = ''

        try {

            this.isLoading = true

            await this.deleteOptionalUseCase.execute(new DeleteOptionalParams(id))

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao deletar o opcional. Tente novamente.'
            }
        }
        this.isLoading = false
    }
}