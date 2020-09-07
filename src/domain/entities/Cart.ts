import { observable } from "mobx"

export class Cart {
    @observable
    products: CartProduct[] = []
    @observable
    config?: CartConfig
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