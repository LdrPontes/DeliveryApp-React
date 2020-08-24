import { observable, action } from "mobx"
import { EnterpriseUser } from "../../../../domain/entities/EnterpriseUser"
import { SignUpEnterpriseUseCase, SignUpEnterpriseParams } from "../../../../domain/usecases/auth/SignUpEnterpriseUseCase"
import { AppError } from "../../../../domain/utils/AppError"


export class RegisterFormViewModel {

    signUpEnterpriseUseCase = new SignUpEnterpriseUseCase()
    
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

    private setDefaultValues(){
        this.errorEmail = false
        this.errorEmailMsg = ''

        this.errorPassword = false
        this.errorPasswordMsg = ''

        this.errorName = false
        this.errorNameMsg = ''
        
        this.errorTelephone = false
        this.errorTelephoneMsg = ''

        this.isSuccess = false
    }


    private hasFieldErrors(): boolean{
        
        if(this.name === '') {
            this.errorName = true
            this.errorNameMsg = 'Informe um nome'
            return true
        }   

        if(this.telephone === '') {
            this.errorTelephone = true
            this.errorTelephoneMsg = 'Informe um telephone'
            return true
        }      

        if(this.email === '') {
            this.errorEmail = true
            this.errorEmailMsg = 'Informe um e-mail'
            return true
        }         

        if(this.password === '' && this.password.length < 6) {
            this.errorPassword = true
            this.errorPasswordMsg = 'Informe uma senha válida'
            return true
        }    

     
        return false
    }

    @action
    async handlerSignUp(): Promise<void> {
        this.setDefaultValues()
        this.isLoading = true
        try {

            if(this.hasFieldErrors()){
                this.isLoading = false
                return
            }

            await this.signUpEnterpriseUseCase.execute(new SignUpEnterpriseParams(this.name, this.telephone, this.email, this.password))
        
            this.isSuccess = true

        } catch (error) {

            if(error instanceof AppError){
              this.handlerResponseErrors(error)
            }

            this.isSuccess = false
        }

        this.isLoading = false

    }

    private handlerResponseErrors(error: AppError){
        switch(error.name){
            case 'ER_DUP_ENTRY':
                this.errorEmail = true
                this.errorEmailMsg = 'Esse e-mail já está cadastrado.'
                break
            default:
                break
        }
    }
}