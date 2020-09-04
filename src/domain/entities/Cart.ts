export interface Cart {
    products: CartProduct[]
    config: CartConfig
}

export interface CartProduct {
    name: string
    optionals: CartOptional[]
    observation?: string
    quantity: number
}

export interface  CartOptional {
    name: string
}

export interface CartConfig {
    paymentType: number
    clientName: string
    clientTelphone: string
    clientAddress?: string
    clientCPF?: string
}