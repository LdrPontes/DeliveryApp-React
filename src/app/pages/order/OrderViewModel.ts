import { observable, action, computed } from "mobx"
import { Enterprise } from "../../../domain/entities/Enterprise"
import { ReadEnterpriseByCodeUseCase, ReadEnterpriseByCodeParams } from "../../../domain/usecases/order/ReadEnterpriseByCodeUseCase"
import { AppError } from "../../../domain/utils/AppError"
import { Product } from "../../../domain/entities/Product"
import { EnterpriseSettings } from "../../../domain/entities/EnterpriseSettings"
import { Optional } from "../../../domain/entities/Optional"
import { Cart, CartOptional, CartProduct, CartConfig } from "../../../domain/entities/Cart"
import { GetAddressUseCase, GetAddressParams } from "../../../domain/usecases/address/GetAddressUseCase"

export class OrderViewModel {

    readEnterpriseByCodeUseCase = new ReadEnterpriseByCodeUseCase()
    getAddressUseCase = new GetAddressUseCase()

    @observable
    sendWhatsappMessage = false

    @observable
    linkWhatsapp = ''

    /**
     * Cart 
     */
    @observable
    selectedDeliveryType = -1

    @observable
    selectedPaymentType = -1

    @observable
    cart: Cart = new Cart()

    @observable
    errorNumber = ''

    @observable
    errorCep = ''

    @observable
    cep = ''

    @observable
    errorTelephone = ''

    @observable
    telephone = ''

    @observable
    cpf = ''

    @observable
    errorCpf = ''

    @observable
    address = ''

    @observable
    complement = ''

    @observable
    number = ''

    @observable
    clientName = ''

    @observable
    errorClientName = ''

    @observable
    errorProducts = ''

    @observable
    errorDelivery = ''

    @observable
    errorPayment = ''

    /**
     * Dialog Product
     */

    @observable
    totalPrice = 0

    @observable
    selectedOptionals: Optional[] = []

    @observable
    observation = ''

    @observable
    quantity = 1

    @observable
    errorQuantity = ''

    @computed get productPrice(): number {
        if (this.selectedProduct !== undefined) {
            return this.selectedProduct.price * Number(this.quantity)
        } else {
            return 0
        }
    }


    @computed get lengthObservation(): number {
        return 144 - this.observation.length
    }

    @observable
    errorOptional = { id: -1, msg: "" }

    /**
     * General
     */
    @observable
    selectedProduct?: Product

    @observable
    openDialogProduct = false

    @observable
    openDialogCart = false

    @observable
    enterprise?: Enterprise

    @observable
    settings?: EnterpriseSettings

    @observable
    errorApi = ''

    @action
    async readEnterpriseByCode(code: string): Promise<void> {
        this.errorApi = ''

        try {
            const result = (await this.readEnterpriseByCodeUseCase.execute(new ReadEnterpriseByCodeParams(code))).enterprise

            const settings = result.settings.toString()

            result.settings = JSON.parse(settings)

            this.settings = JSON.parse(settings)

            this.enterprise = result

        } catch (error) {
            if (error instanceof AppError) {
                this.errorApi = 'Erro ao buscar os dados. Tente novamente.'
            }
        }
    }

    @action
    handleSelectOptional(sectionMax: number, sectionMin: number, sectionId: number, optional: Optional): void {
        let count = 0

        for (const i in this.selectedOptionals) {
            if (this.selectedOptionals[Number(i)].id === optional.id) {
                this.selectedOptionals = this.selectedOptionals.filter(obj => obj !== optional)
                this.totalPrice -= optional.price
                return
            }
            if (this.selectedOptionals[Number(i)].optional_section_id === sectionId) {
                count++
            }
        }

        if (count >= sectionMax) {
            console.log("Nao adicionou")
        } else {
            this.selectedOptionals.push(optional)
            this.totalPrice += optional.price
        }
    }

    isOptionalSelected(id: number): boolean {
        for (const i of this.selectedOptionals) {
            if (i.id === id) {
                return true
            }
        }
        return false
    }

    @action
    setDefaultProductValues(): void {
        this.totalPrice = 0
        this.selectedOptionals = []
        this.observation = ''
        this.quantity = 1
    }

    private hasSelectedOptionalsError(): boolean {
        this.errorOptional = { id: -1, msg: '' }
        for (const i of this.selectedProduct!.optional_sections) {
            const countSelectedOptionalBySection = this.selectedOptionals.filter((optional) => optional.optional_section_id === i.id).length

            if (countSelectedOptionalBySection < i.min) {
                this.errorOptional = { id: i.id, msg: `Selecione pelo menos ${i.min}` }
                return true
            }
        }

        return false
    }


    private hasErrorsToAddProduct(): boolean {

        this.errorQuantity = ''
        if (this.hasSelectedOptionalsError()) {
            return true
        }

        if (this.quantity < 1) {
            this.errorQuantity = 'Informe a quantidade'
            return true
        }


        return false
    }

    @action
    addProductToCart(): void {


        if (this.hasErrorsToAddProduct()) {
            return
        }


        const optionals = []

        for (const i of this.selectedOptionals) {
            optionals.push(new CartOptional(i.name, i.price))
        }

        this.cart.products.push(new CartProduct(this.selectedProduct!.title, optionals, this.quantity, this.selectedProduct!.price, this.observation))

        this.openDialogProduct = false
    }

    @action
    deleteProductCart(index: number): void {
        this.cart.products.splice(index, 1);
    }

    @action
    handleAddressByCep(e: any): void {
        this.cep = e.target.value

        if (this.cep.trim().length === 9) {
            this.getAddressByCep()
        }
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
    setDefaultCartValues(): void {

        this.selectedDeliveryType = -1
        this.selectedPaymentType = -1
        this.cep = ''
        this.complement = ''
        this.address = ''
        this.number = ''
        this.cpf = ''
    }

    @action
    sendOrderToEnterpriseByWhatsapp(): string {
        if (this.hasCartErrors()) {
            return ''
        }

        const address = `${this.address}, ${this.number}, ${(this.complement !== '' ? this.complement + "," : '')} ${this.cep}`

        this.cart.config = new CartConfig(this.selectedPaymentType, this.clientName, this.telephone, this.selectedDeliveryType === 0, address, this.cpf)

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return `https://api.whatsapp.com/send?phone=55${this.enterprise!.user!.telephone.replace(' ', '').replace('(', '').replace(')','').replace('-','')}&text=%20` + encodeURIComponent(this.cart.buildMessage(this.enterprise!, this.settings!))
    }

    private isValidPhone(phone: string): boolean {
        // eslint-disable-next-line
        const brazilianPhoneRegex = /\(\d{2}\)\s\d{4,5}\-\d{4}/g
        return brazilianPhoneRegex.test(phone)
    }

    private isValidCPF(cpf: string) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999")
            return false;
        // Valida 1o digito	
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito	
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    setDefaultCartErrorValues(): void {
        this.errorProducts = ''
        this.errorClientName = ''
        this.errorTelephone = ''
        this.errorCpf = ''
        this.errorCep = ''
        this.errorDelivery = ''
        this.errorPayment = ''
        this.errorNumber = ''
    }

    private hasCartErrors(): boolean {

        this.setDefaultCartErrorValues()

        if (this.cart.products.length === 0) {
            this.errorProducts = 'Nenhum produto foi selecionado'
            return true
        }

        if (this.clientName === '') {
            this.errorClientName = 'Informe um nome'
            return true
        }

        if (this.telephone === '') {
            this.errorTelephone = 'Informe um telefone'
            return true
        }

        if (!this.isValidPhone(this.telephone)) {
            this.errorTelephone = 'Informe um telefone válido'
            return true
        }

        if (this.cpf !== '' && !this.isValidCPF(this.cpf)) {
            this.errorCpf = 'Informe um CPF válido'
            return true
        }



        if (this.selectedDeliveryType === -1) {
            this.errorDelivery = 'Selecione um meio de entrega'
            return true
        }

        if (this.selectedDeliveryType === 1 && this.address === '') {
            this.errorCep = 'Informe um CEP válido'
            return true
        }

        if (this.selectedDeliveryType === 1 && this.number === '') {
            this.errorNumber = 'Informe o número do estabelecimento'
            return true
        }

        if (this.selectedPaymentType === -1) {
            this.errorPayment = 'Selecione um meio de pagamento'
            return true
        }

        return false
    }

}