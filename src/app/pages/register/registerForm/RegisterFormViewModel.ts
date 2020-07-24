import { observable, action } from "mobx"
import { EnterpriseUser } from "../../../../domain/entities/EnterpriseUser"


export class RegisterFormViewModel {
    @observable
    isLoading = false
    
    @observable
    enterpriseUser: EnterpriseUser | undefined

    @observable
    email = ''

    @observable
    password = ''

    @observable
    name = ''

    @observable
    telephone = ''

    @observable
    errorName = false

    @observable
    errorTelephone = false

    @observable
    errorEmail = false

    @observable
    errorPassword = false

    @observable
    errorEmailMsg = ''

    @observable
    errorPasswordMsg = ''

    @observable
    errorNameMsg = ''

    @observable
    errorTelephoneMsg = ''

    @observable
    showPassword = false

    @observable
    isSuccess = false

    @observable
    step = 0

    @action
    handlerShowPassword(): void {
        this.showPassword = !this.showPassword
    }

    @action
    handlerSignUp(): void {
        //TODO
    }
}