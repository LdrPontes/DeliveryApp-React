import { observable, action } from "mobx";
import { EnterpriseSettings, DailyWork } from "../../../domain/entities/EnterpriseSettings";
import { GetSavedEnterpriseUserUseCase } from "../../../domain/usecases/user/GetSavedEnterpriseUserUseCase";
import { Enterprise } from "../../../domain/entities/Enterprise";
import { UpdateEnterpriseSettingsUseCase, UpdateEnterpriseSettingsParams } from "../../../domain/usecases/enterprise/UpdateEnterpriseSettingsUseCase";

export class ConfigViewModel {

    getSavedEnterpriseUserUseCase = new GetSavedEnterpriseUserUseCase()
    updateEnterpriseSettingsUseCase = new UpdateEnterpriseSettingsUseCase()

    @observable
    selectedTab = 0

    @observable
    enterprise?: Enterprise | null = null

    @observable
    enterpriseSettings?: EnterpriseSettings = undefined

    @observable
    loading = false

    @observable
    errorApi = ''

    @observable
    successUpdate = false

    @observable
    openAddTimeDialog = false


    //New Time variables
    @observable
    newStartDay = -1

    @observable
    newEndDay = -1

    @observable
    newStartTime = ''

    @observable
    newEndTime = ''

    @observable
    errorNewEndTime = ''

    @observable
    errorNewStartTime = ''

    @observable
    errorNewStartDay = ''

    @observable
    errorNewEndDay = ''

    @action
    async initEnterpriseSettings(): Promise<void> {
        try {
            this.enterprise = (await this.getSavedEnterpriseUserUseCase.execute()).user?.enterprise

            const result = (await this.getSavedEnterpriseUserUseCase.execute()).user?.enterprise?.settings.toString()

            this.enterpriseSettings = JSON.parse(result!)

        } catch (error) {
        }
    }

    @action
    async updateSettings(): Promise<void> {
        try {
            this.loading = true

            await this.updateEnterpriseSettingsUseCase.execute(new UpdateEnterpriseSettingsParams(this.enterprise!.id, this.enterpriseSettings!))

            this.loading = false
            this.successUpdate = true
        } catch (error) {
            this.errorApi = 'Erro ao atualizar as configurações. Verifique seus dados e tente novamente'
        }
    }

    getWeekDays() {
        return [
            { id: 0, name: 'Segunda' },
            { id: 1, name: 'Terça' },
            { id: 2, name: 'Quarta' },
            { id: 3, name: 'Quinta' },
            { id: 4, name: 'Sexta' },
            { id: 5, name: 'Sábado' },
            { id: 6, name: 'Domingo' }
        ]
    }

    @action
    handleAddTime(): void {
        this.errorNewStartDay = ''
        this.errorNewEndDay = ''
        this.errorNewEndTime = ''
        this.errorNewStartTime = ''

        if (this.newStartDay === -1) {
            this.errorNewStartDay = 'Selecione um dia'
            return
        }

        if (this.newEndDay === -1) {
            this.errorNewEndDay = 'Selecione um dia'
            return
        }

        if (this.newStartTime === '') {
            this.errorNewStartTime = 'Informe um horário'
            return
        }

        if (this.newEndTime === '') {
            this.errorNewEndTime = 'Informe um horário'
            return
        }

        if (this.convertDate(this.newStartTime) > this.convertDate(this.newEndTime)) {
            this.errorNewEndTime = 'A data final deve ser menor que a inicial'
            return
        }


        const newDailyWork = new DailyWork(this.newStartDay, this.newEndDay, this.newStartTime, this.newEndTime)
        this.enterpriseSettings?.enterprise.daily_works.push(newDailyWork)

        this.openAddTimeDialog = false

    }

    convertDate(time: string): Date {
        const date = new Date()

        date.setHours(Number(time.split(':')[0]))
        date.setMinutes(Number(time.split(':')[1]))

        return date
    }

}