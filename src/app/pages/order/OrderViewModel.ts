import { observable } from "mobx"

export class OrderViewModel {
    @observable
    openDialogProduct = false

    @observable
    openDialogCart = true
}