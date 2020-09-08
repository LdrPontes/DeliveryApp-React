import { observable } from "mobx"
import { Enterprise } from "./Enterprise"
import { EnterpriseSettings } from "./EnterpriseSettings"

export class Cart {
    @observable
    products: CartProduct[] = []
    @observable
    config?: CartConfig


    buildMessage(enterprise: Enterprise, settings: EnterpriseSettings): string {
        let message = ''

        //Header
        message += `*Pedido #0001* - _${enterprise.name}_\n`
        message += `---------------------------------------\n\n`

        //Products
        for (const i of this.products) {
            message += `*${i.quantity}x ${i.name}*\n`

            for (const j of i.optionals) {
                message += `- ${j.name}\n`
            }

            message += `_${i.observation}_\n`
        }

        message += `\n*Total:* R$ ${this.totalCartPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`

        //Delivery
        message += this.config?.clientPickupOnSite ? '*Retirada no local*' : '*Taxa de entrega:* ' + (settings.delivery.delivery_fee_type === 0 ? 'a combinar'
            : `R$ ${settings.delivery.delivery_fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`)


        message += `\n---------------------------------------\n\n`

        message += `*${this.config?.clientName}*\n`
        message += `${this.config?.clientTelphone}\n`

        if (this.config?.clientCPF !== undefined && this.config.clientCPF !== '')
            message += `\n*CPF na nota:* ${this.config?.clientCPF}\n`

        message += !this.config?.clientPickupOnSite ? `\n*Entrega*\n${this.config?.clientAddress}` : ''

        message += `\n\n*Pagamento:* ${this.config?.paymentType === 0 ? 'Dinheiro' : this.config?.paymentType === 1 ? 'Débito' : 'Crédito'}`

        return message
    }

    totalCartPrice(): number {
        let price = 0

        for (const i of this.products) {
            price = price + (Number(i.price) * i.quantity)

            for (const j of i.optionals) {
                price = price + (Number(j.price) * i.quantity)
            }

        }
        return price
    }
}

export class CartProduct {
    name: string
    optionals: CartOptional[]
    observation?: string
    quantity: number
    price: number

    constructor(name: string, optionals: CartOptional[], quantity: number, price: number, observation?: string) {
        this.name = name
        this.optionals = optionals
        this.observation = observation
        this.quantity = quantity
        this.price = price
    }
}

export class CartOptional {
    name: string
    price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }
}

export class CartConfig {
    paymentType: number
    clientName: string
    clientTelphone: string
    clientAddress?: string
    clientCPF?: string
    clientPickupOnSite: boolean

    constructor(paymentType: number,
        clientName: string,
        clientTelphone: string,
        clientPickupOnSite: boolean,
        clientAddress?: string,
        clientCPF?: string) {
        this.paymentType = paymentType
        this.clientName = clientName
        this.clientTelphone = clientTelphone
        this.clientAddress = clientAddress
        this.clientCPF = clientCPF
        this.clientPickupOnSite = clientPickupOnSite
    }
}