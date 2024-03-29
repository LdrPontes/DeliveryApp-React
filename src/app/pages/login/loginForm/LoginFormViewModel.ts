import { observable, action } from "mobx"
import { EnterpriseUser } from "../../../../domain/entities/EnterpriseUser"
import { SignInEnterpriseUseCase, SignInEnterpriseParams } from "../../../../domain/usecases/auth/SignInEnterpriseUseCase"
import { AppError } from "../../../../domain/utils/AppError"

export class LoginFormViewModel {
    signInEnterpriseUseCase = new SignInEnterpriseUseCase()

    @observable
    isLoading = false

    @observable
    enterpriseUser: EnterpriseUser | undefined

    @observable
    email = ''

    @observable
    password = ''

    @observable
    errorEmail = false

    @observable
    errorPassword = false

    @observable
    errorEmailMsg = ''

    @observable
    errorPasswordMsg = ''

    @observable
    showPassword = false

    @observable
    redirect = ''

    @action
    handlerShowPassword(): void {
        this.showPassword = !this.showPassword
    }

    private setDefaultValues() {
        this.errorEmail = false
        this.errorEmailMsg = ''

        this.errorPassword = false
        this.errorPasswordMsg = ''

        this.isLoading = true

        this.redirect = ''
    }

    private hasFieldErrors(): boolean {

        if (this.email === '') {
            this.errorEmail = true
            this.errorEmailMsg = 'Informe um e-mail'
            return true
        }

        if (this.password === '') {
            this.errorPassword = true
            this.errorPasswordMsg = 'Informe uma senha'
            return true
        }

        return false
    }

    private handlerResponseErrors(error: AppError) {
        switch (error.name) {
            case 'ENTITY_NOT_FOUND':
                this.errorEmail = true
                this.errorEmailMsg = 'Usuário não encontrado.'
                break
            case 'INVALID_PARAMETERS':
                this.errorEmail = true
                this.errorEmailMsg = 'E-mail inválido.'
                break
            case 'INVALID_PASSWORD':
                this.errorPassword = true
                this.errorPasswordMsg = 'Senha incorreta.'
                break
            default:
                break
        }
    }

    @action
    async handlerSignIn(): Promise<void> {

        this.setDefaultValues()
        this.isLoading = true
        try {

            if (this.hasFieldErrors()) {
                this.isLoading = false
                return
            }

            const result = (await this.signInEnterpriseUseCase.execute(new SignInEnterpriseParams(this.email, this.password))).user

            if (result.enterprise != null) {
                this.redirect = '/'
            } else {
                this.redirect = '/enterprise-register'
            }

            return

        } catch (error) {

            if (error instanceof AppError) {
                this.handlerResponseErrors(error)
            }
        }

        this.isLoading = false
    }
}