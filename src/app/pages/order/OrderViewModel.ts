import { observable, action, computed } from "mobx"
import { Enterprise } from "../../../domain/entities/Enterprise"
import { ReadEnterpriseByCodeUseCase, ReadEnterpriseByCodeParams } from "../../../domain/usecases/order/ReadEnterpriseByCodeUseCase"
import { AppError } from "../../../domain/utils/AppError"
import { Product } from "../../../domain/entities/Product"
import { EnterpriseSettings } from "../../../domain/entities/EnterpriseSettings"
import { Optional } from "../../../domain/entities/Optional"
import { Cart, CartOptional, CartProduct } from "../../../domain/entities/Cart"
import { GetAddressUseCase, GetAddressParams } from "../../../domain/usecases/address/GetAddressUseCase"

export class OrderViewModel {

    readEnterpriseByCodeUseCase = new ReadEnterpriseByCodeUseCase()
    getAddressUseCase = new GetAddressUseCase()
    /**
     * Cart 
     */
    get totalCartPrice(): number {
        let price = 0

        for (const i of this.cart.products) {
            price = price + Number(i.price)

            for (const j of i.optionals) {
                price = price + Number(j.price)
            }

        }
        console.log('TOTAL ' + price)
        return price
    }
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

    @action
    addProductToCart(): void {

        const optionals = []

        for (const i of this.selectedOptionals) {
            optionals.push(new CartOptional(i.name, i.price))
        }

        this.cart.products.push(new CartProduct(this.selectedProduct!.title, optionals, this.quantity, this.selectedProduct!.price, this.observation))

        console.log(JSON.stringify(this.cart))

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

    
}